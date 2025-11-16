🟧 AGENT ORANGE WIREFRAME SPEC — ECHO OS MVP

Goal:
Implement the structural + light-styled version of the EchoOS site following Pink’s approved architecture.
No heavy visuals.
No animations.
No videos.
Just clear layout, dark UI, and proper routing.

You already have the routes (`/hub`, `/book/[slug]`, `/read/[slug]`, `/map`).
Now apply base Tailwind styling and consistent UX structure.

Follow this EXACT spec:

---

🎯 1. LAUNCH PAGE (`/`)

Layout:
- Full black background (`bg-black`)
- Centered vertical stack
- Echo OS title (simple text temporarily)

Tagline:
- “Choose how you will enter the Echo.”

Buttons (two):
- Enter Story → `/hub`
- Enter Codex → `/map`

Wireframe (textual):
 -------------------------------------------------
|                     (BLACK)                     |
|                                                 |
|               E C H O   O S                     |
|                                                 |
|      "Choose how you will enter the Echo."      |
|                                                 |
|     [ ENTER STORY ]    [ ENTER CODEX ]          |
|                                                 |
 -------------------------------------------------

Tailwind guidance:
- Use a centered flex container.
- Use faint gray text (`text-slate-300`).
- Buttons: `rounded-full`, `border`, `px-6 py-2`.

---

🎯 2. PORTAL HUB (`/hub`)

Purpose:
- List all 7 books as “portals,” minimal styling for now.

Layout:
- Black background
- Page title: Portal Hub
- Subtitle: “Choose a book-world to enter.”
- A simple grid:
  - Mobile: 1 column
  - Desktop: 3 columns

Each portal card:
- Rounded container
- Title (book name)
- Tagline
- Entire card is a link to `/book/{slug}`

Wireframe:
 -----------------------------------------------------
|  PORTAL HUB                                         |
|  Choose a book-world to enter.                      |
|                                                     |
|  [ Wolves in the Echo House ]                       |
|  [ The Devil's Palimpsest ]                         |
|  [ The Devil's Codex ]                              |
|  [ The Devil's Manuscript ]                         |
|  [ Future Farm — Part I ]                           |
|  [ Future Farm — Part II ]                          |
|  [ Future Farm — Part III ]                         |
 -----------------------------------------------------

Tailwind guidance:
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-6`
- Cards: `rounded-xl border border-slate-800 p-4 hover:border-slate-300 transition`

---

🎯 3. BOOK PORTAL PAGE (`/book/[slug]`)

Purpose:
- Serve as the “landing page” for each book.

Layout:
- Black background
- Title at top
- Tagline below

Then a section for:
- If book is live (only `wolves` now):
  - “Start Reading” button → `/read/prologue`
  - List of available chapters
- If not live:
  - Generic “This portal is not live yet.”

Wireframe:
 -----------------------------------------------------
|  < Back to Portal Hub                               |
|                                                     |
|  [ Book Title ]                                     |
|  [ Book Tagline ]                                   |
|                                                     |
|  If wolves:                                         |
|     [ Start Reading ] → /read/prologue              |
|     Chapter List                                    |
|                                                     |
|  Else:                                              |
|     "This portal is not live yet."                  |
 -----------------------------------------------------

Tailwind guidance:
- Wrapper: `max-w-2xl mx-auto p-6 text-slate-200`
- Buttons: `rounded-full border px-5 py-2`

---

🎯 4. READER PAGE (`/read/[slug]`)

- Do NOT change structure.
- Just polish:
  - Add max-width container (`max-w-3xl mx-auto p-6`)
  - Add readable typography (`prose prose-invert` if available)
- Pink says: Keep it like a book.

---

🎯 5. CODEX MAP (`/map`)

- For now: text-only list of graph nodes, lightly styled.

Layout:
- Black background
- Title: “Graph Mode (Stub)”
- List of nodes with links

Tailwind guidance:
- `max-w-3xl mx-auto p-6 text-slate-300`

---

🎯 6. GLOBAL STYLE REQUIREMENTS

Apply consistently across all new pages:
- Background: `bg-black`
- Text: `text-slate-200` or `text-slate-300`
- Links: underline on hover
- Headings: tighter tracking (`tracking-wider`)
- Layout: center everything within max-width containers

---

🎯 7. DO NOT DO YET

❌ No videos

❌ No images

❌ No animations

❌ No portals glowing

❌ No graph visualization

❌ No changing MDX reader internal logic

❌ No altering chapter import map

This sprint is to establish a clean visual container for all routes.

---

🟧 DELIVERABLES FOR GREEN

Green should produce (in a PR or commit):
- Updated `/` with landing layout above
- Styled `/hub` portal grid
- Styled `/book/[slug]` portal landing
- Slight styling polish to `/read/[slug]`
- Styled `/map` basic list

No breaking changes to routing or MDX system

Zero TypeScript or lint errors

---

🟩 If Green follows this, the entire Echo OS will feel real, even without visuals.

Just implement the structure and light styling exactly as above.
