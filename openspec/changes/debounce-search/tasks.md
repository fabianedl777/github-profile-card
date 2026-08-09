# Tasks: Debounce Search

## Phase 1: Debounce Utility (TDD)

- [ ] 1.1 RED: Write tests for `debounce.ts` → GREEN: Implement debounce with cancel
- [ ] 1.2 Update `src/main.ts` — wire input event with debounced handleSearch, cancel on submit

## Phase 2: Build & Deploy

- [ ] 2.1 Run `npx vitest run` — all tests pass
- [ ] 2.2 Verify `tsc --noEmit` passes
- [ ] 2.3 Commit and push
- [ ] 2.4 Verify GitHub Actions deploy succeeds

## Phase 3: Manual Verification

- [ ] 3.1 Typing triggers search 500ms after last keystroke
- [ ] 3.2 Rapid typing fires only one search
- [ ] 3.3 Submit button works immediately
- [ ] 3.4 Empty input does not trigger API call