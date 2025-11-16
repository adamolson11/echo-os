# Image Policy & Guidelines

Purpose

Define a simple, low-friction policy for handling images in Echo OS during Phase 1 so dev logs stay clean, assets are predictable, and Next.js behavior is consistent.

Goals

- Keep the repo as the single source of public assets (`public/images/`).
- Prefer optimized image delivery when possible, but avoid blocking development on missing assets.
- Make it easy to add, replace, or roll back hero/illustration assets.

Directory & naming

- Place static images under `public/images/` with kebab-case filenames, e.g. `echo-hero.jpg` or `chapter-01-still.jpg`.
- For vector placeholders, use `*.svg` files (safe and small).

When to use `next/image` vs `<img>`

- Use `next/image` when you have a real raster asset and want Next.js to optimize delivery. Provide explicit `width` and `height` (or `sizes`) to avoid runtime warnings.
- Use plain `<img>` only for temporary or inline SVGs where Next optimization is unnecessary. Linter may warn; resolve when replacing with a real asset.

Recommended approach for hero/placeholder images

- Add a small SVG placeholder in `public/images/` (we already created `echo-hero.svg`) and use `next/image` pointing to it with explicit `width`/`height`. This keeps the dev server quiet and allows easy replacement later.
- When replacing with a real photo or artwork, add the raster file to `public/images/` and update the `src` on the `Image` component. Keep `width`/`height` or `sizes` set.

Optimization

- Prefer SVG for illustrations, PNG/JPEG/WebP for photos.
- For production, consider converting large images to WebP/AVIF and adding a build-time optimizer or using a CDN that supports automatic optimization.
- Optionally add `svgo` to the repo to minify SVGs before committing.

MDX & content images

- For images referenced directly inside Markdown/MDX content, prefer absolute `public` paths (`/images/...`) or static imports (e.g., `import hero from '@/public/images/foo.jpg'`) depending on your MDX setup.
- If you want MDX to support imported images, plan to migrate to MDX and handle image imports via bundler rules.

CI & validation

- Add a simple CI lint/check that flags missing referenced files in `public/images/`, and warns if `next/image` is used without `width`/`height` or `sizes`.

Developer workflow

- To add a new hero or chapter image:
  - Add the file to `public/images/`.
  - Update the referencing component (use `Image` with explicit dimensions).
  - Run `npm run lint` and `npm run dev` to verify there are no warnings.

Emergency fallback

- If an image is not available, use a safe SVG placeholder and keep `next/image` usage; this avoids noisy dev warnings and preserves layout.

Policy exceptions

- For assets behind authentication or third-party CDNs, record their domains in `next.config.js` (`images.domains`) and use remote `Image` URLs.

Notes

- This policy is intentionally lightweight for Phase 1. For Phase 2 we can adopt more strict image processing and CI checks (automatic optimization, versioning, and large-asset policies).
