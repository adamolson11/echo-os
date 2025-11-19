# Yellow Dev Browser SOP

When testing localhost, always follow these 6 rules:

1. **One dev tab per app**
   - Never open multiple `http://localhost:3000` tabs.
   - Reuse the same tab for different routes/pages.

2. **Use a clean browser profile for dev**
   - Only essential extensions (React DevTools if needed).
   - No password managers, adblockers, or extra helpers.

3. **Limit DevTools usage**
   - Use Elements, Console, Network mostly.
   - Avoid leaving Performance, Memory, Lighthouse open.
   - Only profile/react when actively debugging, then close.

4. **Avoid heavy pages unless needed**
   - Don’t camp on Codex graph or other heavy views during unrelated testing.
   - Use lighter routes for reloads and layout checks.

5. **Restart the tab occasionally**
   - Close and reopen the localhost tab to release memory.

6. **App-level tweaks (optional)**
   - Use a `?mode=lite` flag or env variable to disable heavy features/components during layout/dev.

---

Follow this checklist to keep browser RAM usage low and QA efficient.
