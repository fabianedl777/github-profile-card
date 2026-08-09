# Proposal: GitHub Profile Card MVP

## Intent

Developers need a quick way to view GitHub profiles — their own and others' — without navigating to GitHub.com and clicking through tabs. A lightweight static app that fetches and displays profile data + top repos in a clean card layout.

## Scope

### In Scope
- Search by GitHub username
- Display profile: avatar, name, bio, location, company, blog, followers, following, public_repos
- Display top 5 repos by stars (name, description, stars, language)
- Error handling: user not found, rate limit exceeded, network errors
- Save favorite profiles to localStorage
- Load favorites on page refresh
- TypeScript strict mode, vanilla DOM, BEM CSS
- Deploy to GitHub Pages

### Out of Scope
- Authentication / private profiles
- Commit history or activity graphs
- Compare two profiles side by side
- Dark mode (future change)
- Pagination of repos

## Capabilities

### New Capabilities
- `profile-search`: Search and display GitHub user profiles via the public REST API
- `favorite-profiles`: Save and manage favorite profiles in localStorage

### Modified Capabilities
- None (new project)

## Approach

Static TypeScript app compiled to vanilla JS. No framework, no bundler — `tsc` outputs to a `dist/` folder served by GitHub Pages. Three modules: API layer (`github-api.ts`), rendering layer (`profile-card.ts`, `repo-list.ts`), and state/favorites (`favorites.ts`). Vitest for testing with mocked fetch responses.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/` | New | TypeScript source files |
| `dist/` | New | Compiled JS for GitHub Pages |
| `index.html` | New | Entry point |
| `styles/` | New | BEM CSS files |
| `tests/` | New | Vitest test files |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| GitHub API rate limit (60 req/hr unauthenticated) | Medium | Cache responses in localStorage with TTL |
| GitHub Pages deploy misconfiguration | Low | Use `docs/` folder or `gh-pages` branch |

## Rollback Plan

Delete the `dist/` folder and the GitHub Pages branch. The repo returns to a plain static project with no deployed content.

## Dependencies

- GitHub REST API (public, no auth required)

## Success Criteria

- [ ] User can search any public GitHub username and see their profile
- [ ] Top 5 repos by stars are displayed
- [ ] Favorites persist across page refreshes
- [ ] Error states show user-friendly messages
- [ ] All tests pass with `npx vitest run`
- [ ] TypeScript compiles with no errors (`npx tsc --noEmit`)
- [ ] App deploys to GitHub Pages successfully