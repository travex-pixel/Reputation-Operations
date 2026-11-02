"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { expectedToken } from "@/proxy";

export type UnlockState = { error?: string };

export async function unlockAction(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  const passcode = process.env.WORKSPACE_PASSCODE;
  const next = String(formData.get("next") ?? "/workspace");
  const safeNext = next.startsWith("/workspace") ? next : "/workspace";
  if (!passcode) redirect(safeNext);
  const given = String(formData.get("passcode") ?? "");
  if (given !== passcode) {
    return { error: "That passcode isn’t right. Check the WORKSPACE_PASSCODE value in your Vercel project." };
  }
  const jar = await cookies();
  jar.set("rt_ws", expectedToken(passcode), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/workspace",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect(safeNext);
}
