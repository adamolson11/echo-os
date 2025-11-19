# 🧠 ECHO OS — MASTER SPRINT SPEC (v1.0)

*A single markdown file containing the entire roadmap, creative law, engineering order, and next-step instructions so you never have to manually cut/paste again. Green and Iron simply follow the next unchecked step.*

---

# 🔷 INDEX
1. Vision & Creative Law (Pink + Director)
2. Global Navigation Rules
3. Rooms & Required Components
4. Engineering Pipeline Order (Step-by-Step)
5. Image Assets & Background Specs
6. ExitDoor Architecture
7. Story Room Layout
8. Archive Room Layout
9. Codex Room Rules
10. Gateway Hallway Final Requirements
11. Green/Iron Working Protocol
12. Next-Step Checklist

---

# 1. VISION & CREATIVE LAW
Echo OS is a **House**: a storm-battered modern Florida plantation.

- **Hallway** = central hub
- **Story Room** = storm mansion interior with 7 book portals
- **Archive Room** = cathedral of data (server racks)
- **Codex Room** = not a physical room, loads graph directly
- **Lab Room** = placeholder
- **No navbar**. Travel by doors only.

---

# 2. GLOBAL NAVIGATION RULES
- Each room has exactly **one ExitDoor** → returns to `/gateway`.
- Hallway = entry point.
- 4 hallway doors → Story, Codex, Archive, Lab.
- Codex room = loads CodexGraph directly, with floating ExitDoor.

---

# 3. ROOMS & REQUIRED COMPONENTS
### Gateway (Hallway)
- Stormy interior hero
- 4 glowing doors
- No nav

### Story Room
- Use story background image
- Add `StoryHero`
- Add 7 clickable book portals
- Add `ExitDoor`

### Archive Room
- Use data cathedral background
- Add `ExitDoor`
- Placeholder content until later

### Codex Room
- No room background
- Insert floating `ExitDoor`

---

# 4. ENGINEERING PIPELINE ORDER
> Green + Iron always pick the next **unchecked** item.
> Platinum tasks optional.

### Phase 1 — Foundations
- [ ] Create `ExitDoor` component
- [ ] Add ExitDoor to Story, Archive, Codex
- [ ] Create `RoomBackground` component

### Phase 2 — Background Integration
- [ ] Wire background images into Gateway hero
- [ ] Wire background into Story room
- [ ] Wire background into Archive room

### Phase 3 — Story Room
- [ ] Install `StoryHero`
- [ ] Add book portal grid (7 books)
- [ ] Add hover halo to books
- [ ] Add click routing for each book

### Phase 4 — Archive Room
- [ ] Add server cathedral background
- [ ] Add minimal lore block

### Phase 5 — Codex
- [ ] Add floating exit door
- [ ] Ensure no graph logic changed

---

# 5. IMAGE ASSETS
```
Hallway: /mnt/data/1ad1160a-a417-4340-aa15-e30596e82483.png
Archive: /mnt/data/archive_room.png
Story:   /mnt/data/A_digital_photograph_captures_an_opulent_living_ro.png
```

---

# 6. EXITDOOR ARCHITECTURE
Component path:
`src/components/rooms/ExitDoor.tsx`

Behavior:
- Fixed bottom center
- Soft glow
- Returns to `/gateway`

---

# 7. STORY ROOM LAYOUT
- Full-screen background image
- `StoryHero` mounted at top
- Meta strip (optional)
- Book portal grid (7 books)
- `ExitDoor` at bottom center

---

# 8. ARCHIVE ROOM LAYOUT
- Full-screen data cathedral background
- Minimal text panel
- ExitDoor

---

# 9. CODEX ROOM RULES
- Never alter physics
- Overlay ExitDoor only
- No backgrounds

---

# 10. GATEWAY HALLWAY FINAL REQUIREMENTS
- Storm hero
- 4 doors
- Glow logic
- Light falloff in hallway

---

# 11. GREEN/IRON PROTOCOL
### Green
- Pull
- Run dev server
- Fix runtime/TS only
- Validate navigation
- Approve merges

### Iron
- Build features
- Wire components
- Follow checklist order

---

# 12. NEXT-STEP CHECKLIST (Live)
> Director updates this list. Engineers execute top-to-bottom.

### Current Tasks
- [ ] Iron: Implement ExitDoor in Story, Archive, Codex.
- [ ] Green: Validate new pages load.
- [ ] Iron: Create Archive page scaffold.
- [ ] Platinum: (optional) Style `RoomBackground`.
- [ ] Iron: Wire Story background.

