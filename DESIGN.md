# Design Brief

**Purpose & Tone:** Inner Compass Help is a global wellness platform delivering mental and physical health support with warmth, inclusivity, and accessibility. Tone is supportive and human—never clinical or sterile.

**Differentiation:** Multi-theme system (cloud, ocean, sunset, night) lets users choose emotional palettes matching their state. High-contrast accessibility mode ensures clarity for all users.

**Color Palette**

| Theme | Background | Foreground | Primary | Accent | Emotional Quality |
|-------|-----------|-----------|---------|--------|-------------------|
| **Cloud** (default) | L0.98 pale lavender | L0.2 slate | L0.65 soft purple | L0.72 aqua | Gentle, protective |
| **Ocean** | L0.15 deep teal | L0.93 cream | L0.55 bright aqua | L0.72 cyan | Grounding, trustworthy |
| **Sunset** | L0.97 warm peach | L0.25 burnt sienna | L0.75 coral | L0.72 warm amber | Energizing, hopeful |
| **Night** | L0.12 deep indigo | L0.92 off-white | L0.68 violet | L0.72 lavender | Calm, restful |

Typography

| Role | Font | Use |
|------|------|-----|
| Display | Fraunces (serif) | Headlines, focal moments, app logo |
| Body | General Sans (humanist sans) | Body copy, UI labels, navigation |
| Mono | JetBrains Mono | Code, technical content, data displays |

**Shape & Depth:** Soft rounded corners (0.625rem), layered card surfaces with subtle shadows (shadow-soft, shadow-elevated), breathing room between elements. No harsh shadows or glass morphism.

**Structural Zones**

| Zone | Treatment |
|------|-----------|
| Header | bg-card with border-b, elevated shadow |
| Main Content | bg-background, open grid layout |
| Cards/Modules | bg-card with shadow-soft, rounded-lg |
| Forms/Inputs | bg-input with border, rounded-md |
| Footer | bg-muted/40 with border-t, subtle contrast |

**Component Patterns**

- **Buttons:** Primary (bg-primary, text-primary-foreground), secondary (bg-secondary, text-secondary-foreground), icon buttons with hover transitions
- **Cards:** bg-card with rounded-lg, soft shadow, padding-6, used for affirmations, mood tracking, habit display
- **Inputs:** bg-input, border-border, rounded-md, focus:ring-2 ring-accent
- **Accessibility:** High-contrast class (.high-contrast) boosts all L/C values on foreground and accents; font sizes scale via :root.text-size-small/default/large

**Motion:** Smooth transitions (0.3s cubic-bezier) on hover/focus, no decorative animations. Entrance animations on load for emotional impact (subtle fade-in on cards).

**Signature Detail:** Soft gradient overlays on buttons and accent text (subtle color shift from primary to accent), creating visual warmth without distraction.

**Constraints:** Theme switching is CSS class-based (.theme-cloud, .theme-ocean, .theme-sunset, .theme-night). High-contrast toggle via .high-contrast class. Font size scaling via :root.text-size-* on root element. All colors use OKLCH CSS variables; no hex or raw colors in components.
