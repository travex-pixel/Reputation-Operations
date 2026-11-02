import { NextResponse, type NextRequest } from "next/server";

/**
 * Workspace gate. The internal workspace is for the founder only. When
 * WORKSPACE_PASSCODE is set, /workspace routes require a cookie set by the
 * unlock page. Without a passcode (local development) access is open and the
 * workspace shows a warning banner.
 *
 * This is deliberately not an auth system: no accounts, no sessions store.
 * Client data lives in the founder's browser; the gate only stops strangers
 * from seeing an empty tool.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/workspace") || pathname.startsWith("/workspace/unlock")) {
    return NextResponse.next();
  }
  const passcode = process.env.WORKSPACE_PASSCODE;
  if (!passcode) return NextResponse.next();

  const cookie = request.cookies.get("rt_ws")?.value;
  if (cookie && cookie === expectedToken(passcode)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/workspace/unlock";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

/** Cheap non-reversible token so the passcode itself is never stored in the cookie. */
export function expectedToken(passcode: string): string {
  let h = 2166136261;
  for (let i = 0; i < passcode.length; i++) {
    h ^= passcode.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return `v1.${h.toString(16)}.${passcode.length}`;
}

export const config = {
  matcher: ["/workspace/:path*"],
};
