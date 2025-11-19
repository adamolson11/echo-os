Door Taglines & Image Mapping
=============================

Use this file to coordinate with Rainbow for final copy and which existing images map to each door.

DOORS (current mapping in `src/components/gateway/DoorHallway.tsx`):

- story
  - label: "Story Room"
  - eyebrow: "Enter the Wolves"
  - tagline: "The mainline narrative and its echoes."
  - image: `public/images/gateway/story-door.jpg`

- codex
  - label: "Codex"
  - eyebrow: "Living Brain"
  - tagline: "The graph of memory, myth, and recursion."
  - image: `public/images/gateway/codex-door.jpg`

- lab
  - label: "Echo Lab"
  - eyebrow: "Experiment Zone"
  - tagline: "Prototypes, dangerous ideas, and systems tests."
  - image: `public/images/gateway/lab-door.jpg`

- archive
  - label: "Archive"
  - eyebrow: "Dead Files"
  - tagline: "Cases, records, and branches that didn’t make it."
  - image: `public/images/gateway/archive-door.jpg`

Rainbow checklist:
- Confirm final taglines (shortlist above is a starting point).
- If swapping images, place final assets under `public/images/gateway/` with identical filenames or update `DoorHallway.tsx`.
- For each door, provide the hero image crop guidance (e.g., `object-position: 20% 40%`) if the same hallway photo will be used as a shared background.

Notes:
- Placeholder SVG/JPGs were added to avoid 404s during QA; replace with final art as needed.
