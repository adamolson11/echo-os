## Theme Modes (Universe Moods)

Echo OS supports fictional theme modes for each universe. These are visual-only prototypes for now:

- `wolves`: Floridian Gothic, storm cyan accent, deep shadows, grain overlay
- `futureFarm`: Bright cyber-agri, green/cyan accent, soft gradients
- `psyntuum`: Neon, magenta/blue accent, high contrast
- `hudsonBlue`: Classic noir, blue/gold accent, muted backgrounds

Theme modes affect:
- Accent color
- Shadows
- Gradient overlays
- Panel mood
- Background grain density

Demo and expand as new universes are added.

# Echo OS UI Kit v1.0

## Color Tokens

| Name              | Hex        | Usage                |
|-------------------|------------|----------------------|
| echo-bg           | #080b10    | Global background    |
| echo-surface      | #10141c    | Panels/cards         |
| echo-surface-soft | #181c24    | Softer variant       |
| echo-accent       | #38bdf8    | Storm cyan accent    |
| echo-gold         | #ffc478    | Candlelight accent   |
| echo-text         | #f1f5fa    | Main text            |
| echo-text-muted   | #b6c2d6    | Secondary text       |
| echo-border       | #23304a    | Panel borders        |

## Radii & Shadows

- `rounded-echo-lg`: 1.25rem (hero/card corners)
- `rounded-echo-pill`: 9999px (buttons)
- `shadow-echo-soft`: 0 4px 24px 0 rgba(56,189,248,0.10) (cards)
- `shadow-echo-glow`: 0 0 30px 0 rgba(56,189,248,0.45) (accent glow)

## Type Scale

- H1: `text-4xl md:text-5xl font-bold tracking-tight text-echo-text`
- H2: `text-3xl md:text-4xl font-semibold text-echo-accent`
- Eyebrow: `text-xs md:text-sm uppercase tracking-[0.2em] text-echo-text-muted font-semibold`
- Body: `text-base leading-relaxed text-echo-text-muted`
- Caption: `text-xs text-echo-text-muted`

## Button Variants

- Primary: `bg-echo-accent text-black rounded-echo-pill px-6 py-3 shadow-echo-soft hover:shadow-echo-glow hover:bg-cyan-400 transition`
- Ghost: `border border-white/30 text-echo-text bg-transparent rounded-echo-pill px-6 py-3 hover:bg-white/5 transition`

## Card Patterns

- Card: `bg-echo-surface border border-echo-border/60 rounded-echo-lg shadow-echo-soft hover:bg-white/5 hover:shadow-echo-soft transition`

## Animation Primitives

- Lightning Flicker:
  ```css
  @keyframes lightning-flicker {
    0%, 90%, 100% { opacity: 0; }
    92% { opacity: 0.25; }
    95% { opacity: 0.1; }
  }
  .animate-lightning-flicker {
    animation: lightning-flicker 6s infinite ease-out;
  }
  ```
- Echo Glow:
  ```css
  @keyframes echo-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.4); }
    50% { box-shadow: 0 0 30px 0 rgba(56, 189, 248, 0.6); }
  }
  .animate-echo-glow {
    animation: echo-glow 4s ease-in-out infinite;
  }
  ```

## Implementation Patterns

### EchoPanel Usage
```tsx
import { EchoPanel } from "@/components/ui/EchoPanel";

<EchoPanel header="Panel Title" actions={<Button>Action</Button>} footer="Panel Footer">
  <p>Panel content goes here.</p>
</EchoPanel>
```

### Section Usage
```tsx
import { Section } from "@/components/ui/sections/Section";

<Section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-2xl shadow-echo-soft">
  <h2 className="text-3xl md:text-4xl font-semibold text-echo-accent mb-2">Section Title</h2>
  <p className="text-base leading-relaxed text-echo-text-muted">Section content goes here.</p>
</Section>
```

### Button Usage
```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary">Primary Action</Button>
<Button variant="ghost">Ghost Action</Button>
```

### Card Usage
```tsx
import { Card } from "@/components/ui/Card";

<Card>
  <h3 className="text-lg font-bold text-echo-text mb-1">Card Title</h3>
  <p className="text-sm text-echo-text-muted mb-2">Card content goes here.</p>
</Card>
```

### Animation Primitives
- Add `fade-in`, `animate-echo-glow`, or `animate-lightning-flicker` classes to any component for motion polish.

---

## Best Practices
- Always use color tokens and radii/shadow classes for consistency.
- Prefer Section and EchoPanel for layout and grouping.
- Use motion classes for immersive, cinematic effects.
- Expand this guide as new UI patterns are created.
