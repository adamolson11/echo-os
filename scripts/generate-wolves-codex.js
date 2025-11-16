const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'codex', 'wolves');

function ensureDir() {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
}

function chapterTemplate(id, order, prevId, nextId, title) {
  return `---
type: chapter
series: "Wolves in the Echo House"
order: ${order}
status: stub
slug: "${id}"
---

# ${title}

## Logline
TBD

## Summary
TBD

## Beats
- TBD

## Characters Present
- [[Silas-Palesmith]]

## Symbols & Motifs
- [[Flamma-Radices]]

## Key Events
- TBD

## Themes in Play
- [[Meaning-Simulation]]

## Links
**Previous:** [[${prevId || id}]]  
**Next:** [[${nextId || id}]]

## Codex Notes
TBD
`;
}

function run() {
  ensureDir();

  const prologueId = 'Wolves-Prologue';
  const epilogueId = 'Wolves-Epilogue';
  const totalChapters = 44;

  // Prologue
  fs.writeFileSync(path.join(baseDir, `${prologueId}.md`), chapterTemplate(prologueId, 0, null, 'Wolves-Ch01', 'Prologue'), 'utf8');

  // Chapters
  for (let i = 1; i <= totalChapters; i++) {
    const id = `Wolves-Ch${String(i).padStart(2, '0')}`;
    const prevId = i === 1 ? prologueId : `Wolves-Ch${String(i - 1).padStart(2, '0')}`;
    const nextId = i === totalChapters ? epilogueId : `Wolves-Ch${String(i + 1).padStart(2, '0')}`;
    const title = `Chapter ${i} — TBD`;

    fs.writeFileSync(path.join(baseDir, `${id}.md`), chapterTemplate(id, i, prevId, nextId, title), 'utf8');
  }

  // Epilogue
  fs.writeFileSync(path.join(baseDir, `${epilogueId}.md`), chapterTemplate(epilogueId, totalChapters + 1, 'Wolves-Ch44', null, 'Epilogue'), 'utf8');

  // Index
  const indexContent = `---
type: index
series: "Wolves in the Echo House"
---

# Wolves in the Echo House — Codex Index

## Story Order
- [[${prologueId}]]
${Array.from({ length: totalChapters }, (_, i) => `- [[Wolves-Ch${String(i + 1).padStart(2, '0')}]]`).join('\n')}
- [[${epilogueId}]]

## Core Characters
- [[Silas-Palesmith]]
- [[Paulo-Davinci]]
- [[Dr-Helena-Vale]]

## Key Symbols
- [[Flamma-Radices]]
- [[Hurricanes]]
- [[Doors-and-Keys]]
`;

  fs.writeFileSync(path.join(baseDir, 'Wolves-Codex-Index.md'), indexContent, 'utf8');

  console.log('Wolves Codex files generated in /codex/wolves');
}

run();
