# Proposal: Debounce Search

## Intent

Users currently must press Search to trigger a query. Adding debounce-on-type makes the app feel instant — results appear 500ms after the user stops typing, without needing to submit.

## Scope

### In Scope
- Debounce utility (configurable delay, default 500ms)
- Input event listener on search field with debounce
- Cancel pending search if user keeps typing
- Keep existing submit button as fallback

### Out of Scope
- Search history/autocomplete
- Loading indicator specific to debounce state

## Capabilities

### New Capabilities
- `search-debounce`: Debounced search that triggers automatically as the user types

### Modified Capabilities
- None

## Approach

Add a `debounce` utility in `src/utils/debounce.ts`. Wire an `input` event listener on the search input in `main.ts` that calls `handleSearch` through the debounce. The submit button remains as a manual trigger. Cancel any pending debounced call if a new keystroke arrives.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/utils/debounce.ts` | New | Reusable debounce function |
| `src/main.ts` | Modified | Wire input event with debounce |
| `tests/debounce.test.ts` | New | Tests for debounce utility |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Excessive API calls if debounce too short | Low | 500ms default is conservative enough |
| Race condition: old response arrives after new search | Medium | Ignore stale responses in handleSearch |

## Rollback Plan

Remove the input event listener and debounce utility. Revert main.ts to submit-only search.

## Dependencies

- None

## Success Criteria

- [ ] Typing a username triggers search 500ms after last keystroke
- [ ] Pressing Search immediately triggers search
- [ ] Rapid typing does not fire multiple API calls
- [ ] All tests pass with `npx vitest run`
- [ ] TypeScript compiles with no errors (`npx tsc --noEmit`)