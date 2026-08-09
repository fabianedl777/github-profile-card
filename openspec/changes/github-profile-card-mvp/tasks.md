# Tasks: GitHub Profile Card MVP

## Phase 1: Project Setup

- [ ] 1.1 Create `package.json` with TypeScript and Vitest dev dependencies
- [ ] 1.2 Create `tsconfig.json` with strict mode, ESM output to `dist/`
- [ ] 1.3 Create `vitest.config.ts` with DOM environment (jsdom)
- [ ] 1.4 Create `index.html` with search input, profile container, favorites container
- [ ] 1.5 Create `styles/main.css` with BEM, mobile-first, CSS custom properties

## Phase 2: TypeScript Modules (TDD)

- [ ] 2.1 Create `src/types.ts` with UserProfile, Repo, CachedResponse interfaces
- [ ] 2.2 RED: Write tests for `utils/dom.ts` → GREEN: Implement createElement, clearChildren
- [ ] 2.3 RED: Write tests for `github-api.ts` → GREEN: Implement fetchUserProfile, fetchTopRepos, cache logic (localStorage TTL 10min)
- [ ] 2.4 RED: Write tests for `profile-card.ts` → GREEN: Implement renderProfile, renderError, renderLoading
- [ ] 2.5 RED: Write tests for `repo-list.ts` → GREEN: Implement renderRepos, renderEmptyRepos
- [ ] 2.6 RED: Write tests for `favorites.ts` → GREEN: Implement getFavorites, saveFavorite, removeFavorite, renderFavorites
- [ ] 2.7 Create `src/main.ts` with event listeners and init orchestration

## Phase 3: Build & Deploy

- [ ] 3.1 Run `npx vitest run` — all tests pass
- [ ] 3.2 Compile with `tsc` and verify output in `dist/`
- [ ] 3.3 Verify `tsc --noEmit` passes with no errors
- [ ] 3.4 Commit and push to GitHub
- [ ] 3.5 Enable GitHub Pages on repo (Settings → Pages → master branch /root)
- [ ] 3.6 Verify app is live at https://fabianedl777.github.io/github-profile-card/

## Phase 4: Manual Verification

- [ ] 4.1 Search a valid user (e.g., "torvalds") — profile displays with all fields
- [ ] 4.2 Search a non-existent user — error message shows
- [ ] 4.3 Save a favorite, refresh page — favorite persists
- [ ] 4.4 Click a favorite — triggers search automatically
- [ ] 4.5 Remove a favorite — disappears from list
- [ ] 4.6 Search with empty input — no API call, message shows