import type { Metadata } from "next";
import { Shell } from "@/components/workspace/Shell";
import "./workspace.css";

export const metadata: Metadata = {
  title: { default: "Workspace", template: "%s · Reputrail workspace" },
  robots: { index: false, follow: false, nocache: true },
};

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const gated = Boolean(process.env.WORKSPACE_PASSCODE);
  return <Shell gated={gated}>{children}</Shell>;
}
