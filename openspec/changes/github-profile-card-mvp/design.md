# Design: GitHub Profile Card MVP

## Architecture

```
src/
├── main.ts          # Entry point, event wiring, init
├── github-api.ts    # API layer: fetch user + repos
├── types.ts         # TypeScript interfaces (UserProfile, Repo, etc.)
├── profile-card.ts  # Render profile card to DOM
├── repo-list.ts     # Render top repos to DOM
├── favorites.ts     # localStorage CRUD for favorites
└── utils/
    └── dom.ts       # DOM helpers (createElement, clear)
```

## Key Decisions

### Decision 1: No bundler — tsc only
**Choice:** Use `tsc` to compile TS → JS, no webpack/vite/esbuild.
**Rationale:** GitHub Pages serves static files. A bundler adds complexity for a project this small. tsc output is sufficient.
**Tradeoff:** No tree-shaking, no CSS bundling. Acceptable for MVP size.

### Decision 2: Module structure — ESM with type="module"
**Choice:** Use ES modules in browser via `<script type="module">`.
**Rationale:** Native browser support, no bundler needed for dev. tsc compiles to ESM.
**Tradeoff:** Older browsers won't work. Acceptable for a developer tool.

### Decision 3: API caching — localStorage with TTL
**Choice:** Cache API responses in localStorage with 10-minute TTL.
**Rationale:** GitHub unauthenticated rate limit is 60 req/hr. Caching reduces repeated calls for the same user.
**Tradeoff:** Stale data for up to 10 minutes. Acceptable for a profile viewer.

### Decision 4: CSS — BEM, hand-written, mobile-first
**Choice:** BEM naming, CSS custom properties, mobile-first media queries.
**Rationale:** No framework needed for this scope. BEM keeps selectors flat and maintainable.
**Tradeoff:** More verbose class names. Worth the clarity.

## Data Flow

```
User types username → submit
  → github-api.ts: fetchUserProfile(username)
    → check cache → hit? return cached
    → miss? fetch GET /users/{username}
  → github-api.ts: fetchTopRepos(username)
    → fetch GET /users/{username}/repos?sort=stars&per_page=5
  → profile-card.ts: renderProfile(user)
  → repo-list.ts: renderRepos(repos)
  → favorites.ts: check if saved → update button state
```

## TypeScript Interfaces

```typescript
interface UserProfile {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}

interface CachedResponse<T> {
  data: T;
  timestamp: number;
}
```

## File Responsibilities

| File | Responsibility |
|------|---------------|
| `types.ts` | All TypeScript interfaces and type aliases |
| `github-api.ts` | `fetchUserProfile()`, `fetchTopRepos()`, cache logic |
| `profile-card.ts` | `renderProfile()`, `renderError()`, `renderLoading()` |
| `repo-list.ts` | `renderRepos()`, `renderEmptyRepos()` |
| `favorites.ts` | `getFavorites()`, `saveFavorite()`, `removeFavorite()`, `renderFavorites()` |
| `main.ts` | Event listeners, init, orchestration |
| `utils/dom.ts` | `createElement()`, `clearChildren()` helpers |

## Testing Strategy

- **Unit tests:** `github-api.ts` (mocked fetch), `favorites.ts` (mocked localStorage), `profile-card.ts` (DOM assertions)
- **Integration:** `main.ts` init flow with mocked API
- **No E2E:** MVP doesn't justify browser automation setup
- **TDD:** RED → GREEN → REFACTOR. Write failing test first, then implement.

## Build & Deploy

```
tsc → dist/
index.html → references dist/main.js
GitHub Pages → serve from root (or /docs)
```