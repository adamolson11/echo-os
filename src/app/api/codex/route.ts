import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { CodexGraphData } from "@/types/codexGraph";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ?id parameter" }, { status: 400 });
  }

  try {
    const root = process.cwd();
    const codexJsonPath = path.join(root, "public", "codex.json");

    if (!fs.existsSync(codexJsonPath)) {
      return NextResponse.json({ error: "codex.json not found. Run build:codex first." }, { status: 500 });
    }

    const rawJson = fs.readFileSync(codexJsonPath, "utf8");
    const graph = JSON.parse(rawJson) as CodexGraphData;

    const node = graph.nodes.find((n) => n.id === id);

    if (!node) {
      return NextResponse.json({ error: `Node with id "${id}" not found in codex.json` }, { status: 404 });
    }

    if (!node.path) {
      return NextResponse.json({ error: `Node "${id}" has no file path associated.` }, { status: 404 });
    }

    const mdPath = path.join(root, node.path);

    if (!fs.existsSync(mdPath)) {
      return NextResponse.json({ error: `Markdown file not found for path "${node.path}"` }, { status: 404 });
    }

    const mdContent = fs.readFileSync(mdPath, "utf8");

    return NextResponse.json({
      id: node.id,
      title: node.label,
      type: node.type,
      series: node.series,
      tags: node.tags ?? [],
      path: node.path,
      meta: node.meta ?? {},
      markdown: mdContent,
    });
  } catch (err: unknown) {
    console.error("[/api/codex] Error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Internal error", details: message }, { status: 500 });
  }
}
