/**
 * First-party Plausible event endpoint. Content blockers block requests to
 * plausible.trebeljahr.com, so the script (rewritten in next.config.mjs) posts
 * here instead.
 *
 * A plain rewrite is not enough: plausible.trebeljahr.com sits behind
 * Cloudflare, which would report this server's IP to Plausible, so every
 * visitor would count as one and land in the same country. Plausible reads
 * X-Plausible-IP before CF-Connecting-IP, so the visitor's IP goes there.
 */
const PLAUSIBLE_EVENT_URL = "https://plausible.trebeljahr.com/api/event";

export const dynamic = "force-dynamic";

/** Cloudflare sets CF-Connecting-IP in front of this site; X-Forwarded-For is the fallback. */
function visitorIp(headers: Headers) {
  const cf = headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
}

export async function POST(request: Request) {
  const headers: Record<string, string> = {
    "Content-Type": request.headers.get("content-type") ?? "text/plain",
  };
  const userAgent = request.headers.get("user-agent");
  if (userAgent) headers["User-Agent"] = userAgent;
  const ip = visitorIp(request.headers);
  if (ip) headers["X-Plausible-IP"] = ip;

  try {
    const upstream = await fetch(PLAUSIBLE_EVENT_URL, {
      method: "POST",
      headers,
      body: await request.arrayBuffer(),
      cache: "no-store",
    });
    const responseHeaders = new Headers({ "Cache-Control": "no-store" });
    const contentType = upstream.headers.get("content-type");
    if (contentType) responseHeaders.set("Content-Type", contentType);
    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Plausible event proxy failed", error);
    return Response.json(
      { message: "Analytics upstream unavailable" },
      { status: 502 },
    );
  }
}
