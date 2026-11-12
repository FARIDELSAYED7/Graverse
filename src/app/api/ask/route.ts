import { NextResponse } from "next/server";
import { askServiceInfo, handleAskRequest } from "@/lib/ask/handler";

/**
 * Ask GRAVERSE — the server-side OpenRouter endpoint.
 *
 * The route is a thin adapter: all validation, throttling, retrieval and
 * provider error mapping live in `src/lib/ask/handler.ts` so they can be
 * unit-tested without a running server.
 *
 * The OpenRouter key is read from `OPENROUTER_API_KEY` inside the handler.
 * It is never sent to the browser, never included in a response and never
 * logged. Only free models are ever requested.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/** Service state. Reports the configured model, never the key. */
export function GET() {
  return NextResponse.json(askServiceInfo(), {
    headers: { "Cache-Control": "no-store" },
  });
}

/** One question, answered from GRAVERSE records and OpenRouter free models. */
export async function POST(request: Request) {
  const result = await handleAskRequest(request);

  return NextResponse.json(result.body, {
    status: result.status,
    headers: {
      "Cache-Control": "no-store",
      ...(result.headers ?? {}),
    },
  });
}
