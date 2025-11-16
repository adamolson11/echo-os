import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface CodexNode {
  id: string;
  label: string;
  type: string;
  series?: string;
  slug?: string;
  path?: string;
  tags?: string[];
  weight?: number;
  meta?: Record<string, any>;
}

interface CodexLink {
  source: string;
  target: string;
  type?: string;
  strength?: number;
}

interface CodexGraphData {
  nodes: CodexNode[];
  links: CodexLink[];
}

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
    const graph: CodexGraphData = JSON.parse(rawJson);

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
  } catch (err: any) {
    console.error("[/api/codex] Error:", err);
    return NextResponse.json({ error: "Internal error", details: String(err?.message ?? err) }, { status: 500 });
  }
}
