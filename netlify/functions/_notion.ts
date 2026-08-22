/*
  Enough Notion to put a debrief on a page.

  Notion does not take markdown. It takes block objects, and the API rejects the
  whole request if any one block is malformed, so a converter that handles most
  cases and shrugs at the rest loses the entire document rather than one line.
  This covers exactly what the debrief template produces and turns anything it
  does not recognise into a paragraph, which is always valid.
*/

const API = "https://api.notion.com/v1";
const VERSION = "2022-06-28";

const headers = () => ({
  Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
  "Notion-Version": VERSION,
  "Content-Type": "application/json",
});

/*
  Inline bold. The template leans on it hard: every theme in What We Covered is
  a bold subhead, and every entry in Where to Improve opens with one.

  Notion's cap is 2000 characters per rich text object, so a long paragraph is
  split rather than truncated. A debrief that silently loses its last sentence
  is worse than one that reads slightly oddly.
*/
function richText(md: string): any[] {
  const out: any[] = [];

  for (const piece of md.split(/(\*\*[^*]+\*\*)/g)) {
    if (!piece) continue;
    const bold = piece.startsWith("**") && piece.endsWith("**");
    const text = bold ? piece.slice(2, -2) : piece;
    for (let i = 0; i < text.length; i += 2000) {
      out.push({
        type: "text",
        text: { content: text.slice(i, i + 2000) },
        annotations: { bold },
      });
    }
  }

  return out.length ? out : [{ type: "text", text: { content: "" } }];
}

const block = (type: string, extra: Record<string, any> = {}) => (text: string) => ({
  object: "block",
  type,
  [type]: { rich_text: richText(text), ...extra },
});

export function markdownToBlocks(md: string): any[] {
  const blocks: any[] = [];

  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;

    if (/^---+$/.test(line.trim())) {
      blocks.push({ object: "block", type: "divider", divider: {} });
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      blocks.push(block(`heading_${level}`)(heading[2]));
      continue;
    }

    /* Checkboxes before bullets: "- [ ] x" also matches the bullet pattern. */
    const todo = line.match(/^\s*[-*]\s+\[([ xX])\]\s+(.*)$/);
    if (todo) {
      blocks.push(
        block("to_do", { checked: todo[1].toLowerCase() === "x" })(todo[2])
      );
      continue;
    }

    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      blocks.push(block("bulleted_list_item")(bullet[1]));
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      blocks.push(block("quote")(quote[1]));
      continue;
    }

    blocks.push(block("paragraph")(line));
  }

  return blocks;
}

/*
  Notion accepts 100 blocks on create and 100 per append, so a long debrief goes
  up in batches. The page exists after the first call, which matters: if a later
  batch fails there is still a page with a title and most of the content, and a
  link to hand somebody, rather than nothing at all.
*/
export async function createDebriefPage(
  parentPageId: string,
  title: string,
  markdown: string
): Promise<string> {
  if (!process.env.NOTION_API_KEY) throw new Error("notion-not-configured");

  const blocks = markdownToBlocks(markdown);

  const res = await fetch(`${API}/pages`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      parent: { page_id: parentPageId },
      properties: { title: { title: [{ type: "text", text: { content: title } }] } },
      children: blocks.slice(0, 100),
    }),
  });

  if (!res.ok) throw new Error(`notion-create-${res.status}-${await res.text()}`);

  const page = await res.json();

  for (let i = 100; i < blocks.length; i += 100) {
    const append = await fetch(`${API}/blocks/${page.id}/children`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ children: blocks.slice(i, i + 100) }),
    });
    if (!append.ok) {
      /* The page is already there and mostly right. Losing the tail is worth
         reporting, not worth throwing away what landed. */
      console.error("notion append failed at block", i, await append.text());
      break;
    }
  }

  return page.url as string;
}
