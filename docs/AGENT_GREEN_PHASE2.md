Agent Green — begin Phase 2 of Echo OS.
Your mission now is to build the foundations of the “Room Navigation System.”
This system transforms the site into a room-based interface where users click doors → tunnel animation → enter themed rooms → click objects → navigate deeper.

Start with these tasks in order:
1. Create /gateway hallway page (“Door Hallway")

A dark, creepy, slightly glitched hallway

Four clickable doors:

Story

Codex

Archive

Lab

Each door is a button (not a <Link>) so we can trigger animation before routing.

Hover state: subtle glow effect

Click state: freeze the hallway → trigger a full-screen overlay (TunnelOverlay) → then route to the destination.

Routes:

Story → /story

Codex → /codex

Archive → /archive

Lab → /lab

2. Implement TunnelOverlay component

Full-screen component that plays a 1.5s tunnel animation (video or animated still for now).

When it mounts, it:

auto-plays the animation

after 1.5s calls router.push(targetRoute)

Should fade to black or white at the end for a clean transition.

Accept a prop: variant = "story" | "codex" | "archive" | "lab"
(for later, unique tunnels per door.)

3. Basic placeholder rooms

Scaffold these routes with simple placeholder pages (we’ll design them later):

/story — “Story Library Room”

Just a title for now.

/codex — Already implemented (confirm it loads correctly).
/archive — Placeholder page.
/lab — Placeholder page.

Don’t over-design them yet—just make them accessible.

4. Connect the hallway to the Codex system

Ensure that clicking the Codex door → tunnel → /codex loads the markdown Codex nodes correctly.

This confirms the whole pipeline:

Door → Tunnel → Room → Codex → Obsidian

5. Do NOT build full room designs yet

We will deliver detailed room/UI specs after Phase 2 is confirmed working.

For now, you’re only building:

The hallway

The door interactions

The animation logic

The routing pipeline

The placeholder rooms

Execution rules

You have autonomy for minor issues (lint, cleanup, styles, components).

Ask only if routing fails or animation logic breaks.

Keep code simple—this is the foundation layer.

Do not begin advanced graphics or 3D; placeholders are fine for now.

Phase 2 is complete when:

/gateway loads with 4 doors.

Hover glow works.

Clicking a door triggers the tunnel animation.

After the animation, the user lands on the correct page.

Codex still functions normally.

Once this is working, we’ll begin Phase 3 (full room design and interactive objects).

End Directive.
Proceed when ready.
