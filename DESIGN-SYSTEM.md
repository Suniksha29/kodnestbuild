# KodNest Premium Build System
## Design System Documentation

### Design Philosophy

**Calm. Intentional. Coherent. Confident.**

Not flashy, not loud, not playful, not hackathon-style.

The KodNest Premium Build System is designed for serious B2C SaaS products. Every design decision serves a purpose. Every interaction is intentional. This is not a design system built for visual flash—it's built for trust, clarity, and professionalism.

**NO:**
- Gradients
- Glassmorphism
- Neon colors
- Animation noise
- Decorative flourishes
- Random spacing
- Inconsistent interactions

**YES:**
- Clean borders
- Subtle, purposeful transitions
- Clear hierarchy
- Generous whitespace
- Confident typography
- Predictable patterns
- One unified visual language

---

## Color System

We use a **maximum of 4 colors** across the entire system.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | #F7F6F3 | Page background, calm off-white |
| `--color-text-primary` | #111111 | Main text, headings |
| `--color-accent` | #8B0000 | Deep red, primary actions, emphasis |
| `--color-success` | #2D5016 | Muted green, success states |
| `--color-warning` | #8B7500 | Muted amber, warning states |
| `--color-border` | #E8E7E4 | Component borders |
| `--color-surface` | #FFFFFF | Cards, panels, surfaces |
| `--color-text-secondary` | #5A5A5A | Secondary text, hints |
| `--color-disabled` | #D4D3D0 | Disabled states |

### Color Usage Rules

- **Primary Button**: Solid deep red on white text
- **Secondary Button**: Outlined with deep red border and text
- **Links**: Deep red with hover state #6B0000
- **Accents**: Deep red for emphasis in typography or UI elements
- **Success**: Muted green for positive feedback
- **Warning**: Muted amber for caution and alerts
- **Borders**: Subtle light gray to separate components
- **Text**: Dark (nearly black) for primary, medium gray for secondary

**Principle**: No more than 2 colors should appear in a single component (except in special states like error/success alerts).

---

## Typography System

### Font Stack

- **Headings**: Georgia, Garamond, serif
- **Body**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue) for maximum cross-platform consistency

### Font Sizes (Strict Scale)

| Token | Size | Usage |
|-------|------|-------|
| `--font-size-xs` | 12px | Small labels, hints, timestamps |
| `--font-size-sm` | 14px | Secondary text, small buttons |
| `--font-size-base` | 16px | Body text, form inputs, standard buttons |
| `--font-size-md` | 18px | Body text, base headings |
| `--font-size-lg` | 24px | H4, section titles |
| `--font-size-xl` | 32px | H2, major section title |
| `--font-size-2xl` | 40px | H1, page title (desktop) |
| `--font-size-3xl` | 48px | Hero title, major headings |

### Line Heights

- **Tight**: 1.4 (for headings)
- **Base**: 1.6 (for body text)
- **Relaxed**: 1.8 (for comfortable reading in large text blocks)

### Typography Rules

1. **Headings are serif, body is sans-serif.** This distinction is intentional and consistent.
2. **Never use decorative fonts.** All fonts must be system fonts or basic web-safe fonts.
3. **Body text max-width is 720px.** Longer lines are harder to read.
4. **Generous spacing between headings.** Use `margin-bottom: var(--spacing-md)` or `var(--spacing-lg)` on headings.
5. **No random sizes.** Only use the defined font sizes above.

---

## Spacing System

A strict spacing scale ensures consistency and prevents visual chaos.

| Token | Size | Usage |
|-------|------|-------|
| `--spacing-xs` | 8px | Tight spacing, internal element gaps |
| `--spacing-sm` | 16px | Standard padding, component gaps |
| `--spacing-md` | 24px | Section spacing, card padding |
| `--spacing-lg` | 40px | Major section spacing, header padding |
| `--spacing-xl` | 64px | Page-level spacing, hero sections |

### Spacing Rules

1. **Never use arbitrary spacing like 13px, 27px, 35px, etc.** Only multiples of 8.
2. **Whitespace is part of the design.** Generous margins and padding create clarity and reduce cognitive load.
3. **Consistent internal padding.** Cards use `var(--spacing-lg)` padding unless specified otherwise.
4. **Consistent gaps between elements.** Use gap/margin utilities consistently.
5. **Remove bottom margins from last children** in containers to prevent extra spacing.

---

## Global Layout Structure

Every page follows this consistent structure:

```
┌─────────────────────────────────────────────────────┐
│                    TOP BAR                           │
│  [Project Name] [Progress] [Status Badge]           │
├─────────────────────────────────────────────────────┤
│                 CONTEXT HEADER                       │
│  [Large Title] [Subtext with Purpose]               │
├─────────────────────────────────────────────────────┤
│ PRIMARY WORKSPACE   │    SECONDARY PANEL             │
│                     │                                │
│ [Main Content]      │ [Step Explanation]             │
│ [Cards/Forms]       │ [Copyable Prompt]             │
│ [Interactions]      │ [Action Buttons]              │
│ (70%)               │ (30%)                          │
│                     │                                │
├──────────────────────────────────────────────────────┤
│              PROOF FOOTER                            │
│  □ UI Built   □ Logic Working   □ Tested   □ Live   │
└──────────────────────────────────────────────────────┘
```

### Top Bar

- **Sticky positioning** at the top of the page
- **Left**: Project name (serif, confident)
- **Center**: Progress indicator (Step X of Y, with visual step counter)
- **Right**: Status badge (Not Started / In Progress / Shipped)
- **Border**: Subtle bottom border to separate from content

### Context Header

- **Full width**, background color is surface white
- **Title**: Large serif, 1-2 lines maximum
- **Subtitle**: Single line of context about the current section
- **Purpose**: Clear what you're about to do, no marketing hype language

### Primary Workspace (70%)

- Main product interaction area
- Contains forms, cards, and interactive components
- Clean, predictable, no crowding
- Default flex column layout with consistent gaps
- Maximum content width of around 900px on desktop

### Secondary Panel (30%)

- Static contextual information
- **Step Explanation**: Brief text explaining what to do
- **Copyable Prompt Box**: AI prompt or instruction to copy
- **Action Buttons**: Copy, Build in Lovable, It Worked, Error, Add Screenshot
- Sticky or gently scrollable depending on content length
- Calm styling with cards/sections for information hierarchy

### Proof Footer

- **Sticky at the bottom** of the page, always visible
- Checklist-style: □ UI Built □ Logic Working □ Test Passed □ Deployed
- Each checkbox requires proof input (upload, URL, screenshot)
- Responsive grid that adapts on mobile
- Encourages user to log evidence of progress

---

## Component Library

### Buttons

**Primary Button** (Call-to-action)
- Solid deep red background (#8B0000)
- White text
- Padding: 16px 24px
- Border radius: 6px
- Hover state: #6B0000 (darker red)
- Transition: 200ms ease-in-out
- No shadow, no gradient

**Secondary Button** (Alternative action)
- Transparent background
- Deep red (#8B0000) border and text
- Padding: 16px 24px
- Border radius: 6px
- Hover state: Light red background + darker text
- Transition: 200ms ease-in-out

**Tertiary Button** (Less important)
- Transparent background
- Text color: primary
- No border (or very light border)
- Hover: Light gray background
- Used for cancel, back, or secondary options

### Inputs

- **Border**: 1px solid #E8E7E4
- **Focus state**: Border changes to accent color + subtle box shadow (rgba(139, 0, 0, 0.1))
- **Padding**: 16px
- **Border radius**: 6px
- **Font**: Sans-serif, 16px
- **Error state**: Border color #CC0000, different box shadow
- **Disabled state**: Gray background, reduced opacity, cursor not-allowed

### Cards

- **Background**: White
- **Border**: 1px solid #E8E7E4
- **Border radius**: 8px
- **Padding**: 40px (var(--spacing-lg))
- **No shadow** (or very subtle shadow for depth)
- **Hover state**: Border color lightens slightly
- **Dividers inside cards**: 1px solid #E8E7E4

### Badges

- **Pill-shaped** with generous padding
- **Font weight**: 600
- **Font size**: 12px
- **Text transform**: uppercase
- **Colors**: Primary (red), Success (green), Warning (amber), Neutral (gray)
- **No animation**, just a static indicator

### Alerts

- **Left border**: 4px colored border
- **Background**: Very light tint of border color
- **Padding**: 24px
- **Border radius**: 8px
- **Title**: Bold, small font
- **Message**: Regular weight, readable line height
- **States**: Success (green), Warning (amber), Error (red), Info (red)

### Copyable Box

- Used for prompts or code snippets
- **Background**: #F9F9F9 (very light)
- **Border**: 1px solid #E8E7E4
- **Layout**: Content on left, copy button on right
- **Copy button**: Small, text-only, color changes on hover
- **Monospace font** for content

### Progress Indicator

- **Visual step counter** with numbered circles
- **Active step**: Filled red circle with white number
- **Completed step**: Filled green circle with white number
- **Inactive step**: Light gray circle with gray number
- **Text**: "Step X of Y" in secondary color
- **No animation**, smooth transitions only

### Empty States

- **Icon**: Optional, large and muted
- **Title**: What's missing or what to do
- **Text**: Brief explanation
- **Action**: Button or link to next step
- **Never feel dead or hopeless**—always provide a path forward

### Error States

- **Message**: Explain what went wrong
- **Cause**: Why did it fail?
- **Solution**: How to fix it
- **Never blame the user**: Use positive language
- **Example**: "Email already in use" (not "You used the wrong email")

---

## Interactions & Transitions

### Transition Timings

- **Fast**: 150ms (small changes, hover states)
- **Base**: 200ms (standard interactions)
- **Slow**: 300ms (major layout shifts)
- **Easing**: ease-in-out (calm, not bouncy)

### No Animation Noise

- Avoid parallax effects
- Avoid bounce or elastic easing
- Avoid cascading animations
- Avoid auto-playing animations
- Avoid micro-interactions that don't add clarity

### Interactive Principles

1. **Immediate feedback**: User actions should have instant visual confirmation
2. **Predictable behavior**: Hover states match focus states
3. **Consistent interactions**: Same component = same behavior everywhere
4. **Accessibility first**: Keyboard navigation and screen readers supported
5. **Focus visible**: All interactive elements must show clear focus state

---

## Responsive Design

### Breakpoints

- **Mobile**: 640px and below
- **Tablet**: 768px to 1023px
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

### Layout Adaptations

1. **Mobile**: Single column layout, panel stacks below content
2. **Tablet**: Same as mobile or two-column depending on context
3. **Desktop**: Full two-column with 70/30 split
4. **Large screens**: Add max-width to prevent excessive line length

### Mobile-First Rules

- Content must be readable on 320px width
- Touch targets minimum 44px × 44px
- No small buttons that require precision
- Input fields must be easy to tap
- No horizontal scrolling except intentional swipes
- Stack elements vertically when space is limited

---

## Accessibility

### Color Contrast

- All text must have 4.5:1 contrast ratio (WCAG AA standard)
- Accent color tested for sufficient contrast with backgrounds

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Tab order makes logical sense
- Focus state is always visible

### Screen Readers

- All buttons, links, and inputs have descriptive labels
- Form errors are associated with inputs
- Roles and ARIA attributes used where needed

### Focus States

- Global focus outline: 2px solid #8B0000
- Outline offset: 2px
- Never remove focus without replacement

---

## Component Checklist

Before adding a new component, verify:

- [ ] Uses only colors from the palette
- [ ] Uses only font sizes from the defined scale
- [ ] Uses only spacing from the spacing scale
- [ ] Has a clear purpose and isn't redundant
- [ ] Works on mobile and desktop
- [ ] Has visible focus state
- [ ] Transitions are smooth and not jarring
- [ ] No gradients, shadows, or decorative effects
- [ ] Follows the interaction patterns
- [ ] Documented with clear usage guidelines
- [ ] Tested in dark mode (if applicable)

---

## Implementation Guide

### Using Design Tokens

All CSS tokens are defined in `css/design-tokens.css`. Use them consistently:

```css
/* Good - using tokens */
.my-component {
  padding: var(--spacing-md);
  background-color: var(--color-surface);
  border: var(--border-width-thin) solid var(--color-border);
  transition: all var(--transition-base);
}

/* Bad - hardcoding values */
.my-component {
  padding: 24px;
  background-color: white;
  border: 1px solid gray;
  transition: all 200ms ease-in-out;
}
```

### Layout Structure

Every page should use:
```html
<div class="page-wrapper">
  <div class="top-bar">...</div>
  <div class="context-header">...</div>
  <div class="main-content">
    <div class="primary-workspace">...</div>
    <div class="secondary-panel">...</div>
  </div>
  <div class="proof-footer">...</div>
</div>
```

### Component Consistency

- Same component = same styling everywhere
- Extending a component? Add a modifier class (e.g., `.btn-lg`, `.btn-primary`)
- New pattern? Add it to the component library, don't create exceptions

---

## "Everything Must Feel Like One Mind Designed It"

This is the ultimate principle. As you develop and extend this system:

1. **Audit for drift**: Regularly check if new components match existing ones
2. **Question inconsistencies**: Any visual difference should have a purpose
3. **Test holistically**: Do all elements work together cohesively?
4. **Document decisions**: Why does this component look this way?
5. **Remain confident**: Trust the system; don't second-guess decisions

---

## Support & Evolution

This design system is intentionally strict. That strictness creates clarity and professionalism. As the product evolves:

1. Add new components to the library, don't create one-offs
2. Extend spacing/font scales if needed; don't add arbitrary values
3. Review color usage; consider if a new color is truly necessary
4. Maintain the calm, intentional philosophy

The system is strong enough to grow without fracturing.

---

**Last Updated**: 2026  
**Status**: Production-Ready  
**Philosophy**: Calm. Intentional. Coherent. Confident.
