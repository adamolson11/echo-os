NOTIFICATION: Rainbow — Assets & Copy Request

Branch: sandbox/codex-layout-v2
PR Draft: https://github.com/adamolson11/echo-os/compare/main...sandbox/codex-layout-v2?expand=1

Summary:
Green has scaffolded the Gateway hero + hallway and placeholder door images are present in `public/images/gateway/`.

What Rainbow should check / provide:
- Review door taglines and eyebrow copy. Current taglines are listed in `docs/DOOR_TAGLINES.md`.
- If improved hero or door images are required, provide final images named as follows and upload to `public/images/gateway/`:
  - `story-door.jpg`
  - `codex-door.jpg`
  - `lab-door.jpg`
  - `archive-door.jpg`

- Provide alternate-crop suggestions as `bgPosition` values (e.g., `"50% 30%"`) for each door if the focal point needs tuning.

How to deliver:
- Push images to the same branch (`sandbox/codex-layout-v2`) or attach to the Yellow QA report. If pushing images, follow this flow:
  ```bash
  # add images to public/images/gateway
  git add public/images/gateway/<file>
  git commit -m "chore(images): add final gateway images (Rainbow)"
  git push origin HEAD:sandbox/codex-layout-v2
  ```

If Rainbow cannot supply images immediately, provide copy-only updates (taglines/eyebrow lines) in a reply to this file and Yellow will proceed with the placeholders.

Agent Blue will apply any `bgPosition` or minor CSS tweaks requested by Rainbow and run the build to validate.
