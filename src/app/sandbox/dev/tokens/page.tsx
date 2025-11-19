"use client";
import dynamic from "next/dynamic";

const TokenReferencePanel = dynamic(() => import("@/sandbox/dev/tokens/TokenReferencePanel"), { ssr: false });

export default function TokenDemoPage() {
  return (
    <div className="min-h-screen bg-echo-bg py-12 px-4">
      <TokenReferencePanel />
    </div>
  );
}
