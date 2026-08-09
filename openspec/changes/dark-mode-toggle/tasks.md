# Tasks: Dark Mode Toggle

## Phase 1: Theme Module (TDD)

- [ ] 1.1 RED: Write tests for `theme.ts` → GREEN: Implement getTheme, setTheme, toggleTheme, initTheme
- [ ] 1.2 Update `index.html` — add toggle button in header + inline anti-flash script
- [ ] 1.3 Update `styles/main.css` — add light theme variables + transitions
- [ ] 1.4 Update `src/main.ts` — wire toggle button to toggleTheme()

## Phase 2: Build & Deploy

- [ ] 2.1 Run `npx vitest run` — all tests pass
- [ ] 2.2 Verify `tsc --noEmit` passes
- [ ] 2.3 Commit and push
- [ ] 2.4 Verify GitHub Actions deploy succeeds

## Phase 3: Manual Verification

- [ ] 3.1 Toggle switches theme visually
- [ ] 3.2 Theme persists after refresh
- [ ] 3.3 No flash on load
- [ ] 3.4 Smooth transition on toggle