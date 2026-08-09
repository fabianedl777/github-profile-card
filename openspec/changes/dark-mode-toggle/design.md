# Design: Dark Mode Toggle

## Architecture

```
src/
├── theme.ts          # NEW: getTheme, setTheme, toggleTheme, initTheme
└── main.ts           # MODIFIED: wire theme init + toggle button

styles/
└── main.css          # MODIFIED: light theme variables + transitions

index.html            # MODIFIED: inline anti-flash script + toggle button
```

## Key Decisions

### Decision 1: `data-theme` attribute on `<html>`
**Choice:** Set `data-theme="dark|light"` on the `<html>` element.
**Rationale:** Standard approach, works with CSS attribute selectors, no class toggling needed.
**Tradeoff:** None significant.

### Decision 2: Inline script in `<head>` for anti-flash
**Choice:** Small inline `<script>` in `<head>` that reads localStorage and sets `data-theme` before CSS renders.
**Rationale:** Prevents flash of wrong theme. CSS transitions only apply after initial paint.
**Tradeoff:** Inline script violates "no inline" rule slightly, but it's 3 lines and necessary for UX.

### Decision 3: CSS custom properties per theme
**Choice:** Define `[data-theme="light"]` block with light values overriding the `:root` dark values.
**Rationale:** Clean separation, no duplicate CSS, transitions handle the rest.
**Tradeoff:** All themed elements need to use custom properties (already do).

## Data Flow

```
Page load:
  → inline script reads localStorage 'theme'
  → if absent, checks matchMedia('prefers-color-scheme: dark')
  → sets <html data-theme="...">
  → CSS renders with correct theme immediately

User clicks toggle:
  → theme.ts: toggleTheme()
  → read current data-theme
  → set opposite data-theme on <html>
  → save to localStorage
  → CSS transition handles visual change (0.3s)
```

## TypeScript Interfaces

```typescript
type Theme = 'dark' | 'light';
```

## File Responsibilities

| File | Responsibility |
|------|---------------|
| `src/theme.ts` | `getTheme()`, `setTheme()`, `toggleTheme()`, `initTheme()` |
| `src/main.ts` | Wire toggle button click → `toggleTheme()` |
| `styles/main.css` | Light theme variables, transitions on themed elements |
| `index.html` | Inline anti-flash script, toggle button in header |

## Testing Strategy

- **Unit tests:** `theme.ts` — getTheme, setTheme, toggleTheme, initTheme with mocked localStorage and matchMedia
- **TDD:** RED → GREEN → REFACTOR