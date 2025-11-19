# AGENT GREEN — MISSION 07 (Pull Platinum Branch + Validate Integration Points)

Branch: `platinum-gateway-v1` (Platinum's branch)
Merge target: `iron-gateway-hallway-mvp` (only merge when stable)

Goal: Pull Platinum's branch, validate changes to gateway components, run the dev server, and prepare a merge to Iron's branch if stable.

Steps (exact):

1) Pull Platinum’s branch

```bash
git fetch
git checkout platinum-gateway-v1
git pull
```

2) Inspect what Platinum changed

- Review diffs for `src/components/gateway/GatewayHero.tsx` and `src/components/gateway/DoorCard.tsx` (badge + layered visuals)
- Validate all imports/exports are correct
- Validate TypeScript types and props still match

3) Run the dev server

```bash
npm run dev
```

4) QA

Open `/gateway` and check:
- Page loads without errors
- No hydration warnings
- No Tailwind JIT errors
- No unnecessary rerenders or excessive CPU
- No broken layout from badge or layered effects

5) If stable → prepare merge to Iron’s branch

```bash
git checkout iron-gateway-hallway-mvp
git merge platinum-gateway-v1
```

- If conflict-free: great — proceed to step 6.
- If conflicts: fix only the conflicts (code-level), do NOT change design.

6) Report (structured)

Respond with:

🟢 Agent Green — Mission 07 Report

Branch health: (platinum-gateway-v1 status)
Runtime: succeeded / failed (paste logs)
Gateway layout: OK / Broken (describe)
Errors fixed: (filenames & short desc)
Ready to merge to iron-branch: yes / no

Timestamp: (ISO)

Place logs/screenshots under `lab_sys/v1/reports/` and commit them to the branch so Iron and Platinum can see them.
