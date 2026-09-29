import type { Handler } from "@netlify/functions";
import { getMember, memberId, talentSlack, updateMember } from "./_talent";

/*
  Called by /calls when a member with a personal link adds the calls to their
  calendar. Ticks "Added to calendar" on their row and tells #talent the first
  time. Anonymous visitors are not recorded.
*/

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: "" };

  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: "" };
  }

  const id = memberId(body.m);
  if (!id) return { statusCode: 204, headers, body: "" };

  const m = await getMember(id);
  if (!m) return { statusCode: 204, headers, body: "" };

  if (!m.addedToCalendar) {
    await updateMember(id, { "Added to calendar": { checkbox: true } });
    await talentSlack(event, `:calendar: *${m.name}* added the calls to their calendar <${m.url}|Open in Notion>`);
  }
  return { statusCode: 204, headers, body: "" };
};
