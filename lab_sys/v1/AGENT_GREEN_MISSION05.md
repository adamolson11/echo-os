# AGENT GREEN — MISSION 05 (Pair Programming Kickoff)

Branch: `iron-gateway-hallway-mvp`

Goals:
- Prepare the engineering environment and sync with Iron.
- Run a full rebuild and validate the Gateway route and related components.

Steps (exact):

1) Pull latest

```bash
git fetch
git checkout iron-gateway-hallway-mvp
git pull
```

2) Full rebuild (clean to catch breakages)

```bash
rm -rf node_modules .next
npm install
npm run dev
```

Log anything that breaks.

3) QA the updated gateway

Open `/gateway` and check:
- Hero renders correctly with the new gradient & pillars
- No hydration warnings
- No Tailwind JIT errors
- Door grid still intact
- No layout shift issues
- No unexpected console errors

4) Fix ONLY fatal issues

Allowed fixes:
- missing imports / exports
- TypeScript failures
- tailwind class errors
- runtime crashes

Not allowed:
- design changes
- creative tweaking
- glow tuning
- copy changes

5) Structured report (exact format)

Respond with:

🟢 Agent Green — Mission 05 Report

Branch: iron-gateway-hallway-mvp
Dev Server: succeeded / failed (add logs)
Gateway Hero: renders / any issues
Door Grid: intact / broken
Console: (paste warnings/errors)
Fixes applied: (list only essentials)
Status: ready for Iron / needs Director review

Coordinate with Iron if you find any environment or asset blockers.

Timestamp: (add ISO timestamp)
