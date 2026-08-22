import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/*
  Turns a call transcript into the debrief, written to Sean's template.

  The template is read from disk rather than pasted in here, so the one in
  docs/ stays the only copy. Change the document, the output changes with it,
  and there is never a second version quietly drifting from the first.

  Everything a good debrief needs that a transcript does not carry is passed in
  as context: who was on the call, which week it was, who the client is. A
  transcript says "so with the Reels" and expects you to know the rest.
*/

export type CallContext = {
  operator: string;
  client: string;
  week: string;
  date: string;
  kind: "weekly" | "board";
};

const MODEL = "claude-opus-5";

/* Netlify bundles the function's own directory. The template lives two levels
   up in docs/, so it is resolved from the repo root at build time and inlined
   by esbuild if it can, and read at runtime if it cannot. */
function template(): string {
  for (const p of [
    join(process.cwd(), "docs", "call-debrief-template.md"),
    join(__dirname, "..", "..", "docs", "call-debrief-template.md"),
  ]) {
    try {
      return readFileSync(p, "utf8");
    } catch {
      /* try the next one */
    }
  }
  throw new Error("debrief-template-missing");
}

const systemPrompt = (tpl: string) => `You write the call debrief for Sean Fox, who runs The Authority Engine. He coaches media operators who produce content for a founder or expert.

You are given a transcript of one call and you return the debrief, as markdown, following this template exactly:

<template>
${tpl}
</template>

How to use it:

Follow the structure and the section order without deviation. Replace every placeholder. Delete the "How to use this" section entirely from your output, it is instruction, not content. Delete the client's action steps section unless the client was actually in the room.

What We Covered is prose under bold subheads, three to six of them. Not bullets. The reasoning is the value: what was decided, why, and the specific numbers, settings, names and tools that make it actionable in three months. Someone reading it cold should know what to do, not just what was said.

Where to Improve is the honest section. Be direct about what is off and what good looks like. Vague encouragement there is worse than nothing.

Correct obvious transcription errors as you go, particularly names, tool names and client names. If you genuinely cannot resolve something, say so in Worth Noting rather than guessing.

Write in Australian English. No em dashes or en dashes, use a comma or a full stop. No hyphens in compound adjectives. Do not use the pattern "it's not X, it's Y" or any negation-then-reframe. No rhetorical questions answered immediately. No invented concept labels. No filler transitions like "it's worth noting" or "importantly". Short sentences over compound ones.

Never invent a number, a date, a metric or a commitment that is not in the transcript. If something matters and was not said, write [confirm] rather than filling it in.

Return only the markdown document. No preamble, no explanation of what you did.`;

export async function writeDebrief(transcript: string, ctx: CallContext): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("anthropic-not-configured");

  const client = new Anthropic({ apiKey: key });

  const heading =
    ctx.kind === "board"
      ? `This was a Content Board call, so ${ctx.client} was in the room alongside ${ctx.operator}. Include the client's action steps section.`
      : `This was a weekly call between Sean and ${ctx.operator}. The client was not in the room, so delete the client's action steps section.`;

  /*
    Streamed because a transcript of an hour long call plus a full debrief is a
    lot of tokens either way, and a non-streaming request at this size is the
    kind of thing that works in testing and times out on a real call.
  */
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 32000,
    thinking: { type: "adaptive" },
    output_config: { effort: "high" },
    system: [
      {
        type: "text",
        text: systemPrompt(template()),
        /* The template and the instructions are identical on every call, so
           they are worth caching. The transcript below them never is. */
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: `${heading}

Operator: ${ctx.operator}
Client: ${ctx.client}
Week: ${ctx.week}
Date: ${ctx.date}

Transcript:

${transcript}`,
      },
    ],
  });

  const message = await stream.finalMessage();

  if (message.stop_reason === "refusal") {
    throw new Error(`debrief-refused-${message.stop_details?.category ?? "unknown"}`);
  }

  const text = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  if (!text) throw new Error("debrief-empty");
  return text;
}

/*
  Zoom transcripts arrive as WebVTT: a header, then numbered cues with
  timestamps. The timestamps are noise for this purpose and they are a large
  fraction of the tokens, so they go.

  Speaker labels are kept. Who said a thing is most of what separates an action
  for Sean from an action for the operator.
*/
export function vttToTranscript(vtt: string): string {
  const lines = vtt.split(/\r?\n/);
  const out: string[] = [];
  let last = "";

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (t === "WEBVTT") continue;
    if (/^\d+$/.test(t)) continue;
    if (t.includes("-->")) continue;

    /* Zoom repeats the speaker name on every cue. Collapse a run of cues from
       one person into a paragraph so the model reads a conversation rather
       than four hundred fragments. */
    const m = t.match(/^([^:]{1,40}):\s*(.*)$/);
    if (m) {
      const [, speaker, said] = m;
      if (speaker === last) {
        out[out.length - 1] += ` ${said}`;
      } else {
        out.push(`${speaker}: ${said}`);
        last = speaker;
      }
    } else {
      if (out.length) out[out.length - 1] += ` ${t}`;
      else out.push(t);
    }
  }

  return out.join("\n\n");
}
