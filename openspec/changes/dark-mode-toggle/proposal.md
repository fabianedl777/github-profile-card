# Proposal: Dark Mode Toggle

## Intent

The app currently only has a dark theme. Users should be able to switch between dark and light themes, with the preference persisted in localStorage. The initial theme should respect the OS preference via `prefers-color-scheme`.

## Scope

### In Scope
- Theme toggle button in the header
- Light theme CSS variables alongside existing dark theme
- `prefers-color-scheme` detection for initial load
- localStorage persistence of theme choice
- Smooth transition between themes (color fade)

### Out of Scope
- Custom theme editor / color picker
- Multiple preset themes beyond dark/light
- Theme per-profile

## Capabilities

### New Capabilities
- `theme-toggle`: Switch between dark and light themes with persistence

### Modified Capabilities
- None

## Approach

Add a `data-theme` attribute on `<html>` (`dark` or `light`). CSS uses custom properties scoped per `[data-theme]`. A toggle button in the header calls `toggleTheme()`. On init, read localStorage `theme` key; if absent, fall back to `matchMedia('(prefers-color-scheme: dark)')`. Add `transition: color 0.3s, background-color 0.3s` on themed elements.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/theme.ts` | New | Theme detection, toggle, persistence |
| `src/main.ts` | Modified | Wire theme init |
| `styles/main.css` | Modified | Light theme variables + transitions |
| `index.html` | Modified | Add toggle button in header |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Flash of wrong theme on load | Medium | Inline script in `<head>` to set theme before CSS renders |

## Rollback Plan

Remove `src/theme.ts`, revert CSS variables to dark-only, remove toggle button from HTML.

## Dependencies

- None

## Success Criteria

- [ ] Toggle switches between dark and light themes
- [ ] Theme persists across page refreshes
- [ ] Initial theme respects OS preference when no saved choice
- [ ] Transition between themes is smooth (no flash)
- [ ] All tests pass with `npx vitest run`
- [ ] TypeScript compiles with no errors (`npx tsc --noEmit`)