# AGENTS.md - GitHub Profile Card

## Project Overview

Static TypeScript frontend deployed to GitHub Pages. Fetches public GitHub user data via the GitHub REST API and displays profile information client-side.

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Build:** tsc → vanilla JS for GitHub Pages
- **Testing:** Vitest
- **Deploy:** GitHub Pages (static, no backend)

## Coding Standards

### TypeScript

- Use strict TypeScript: `strict: true` in tsconfig
- Prefer explicit types over `any` — use `unknown` when type is genuinely unknown
- Use interfaces for object shapes, type aliases for unions
- Prefer `const` over `let`; never use `var`
- Use arrow functions for callbacks, named functions for top-level
- No unused variables or imports — enable `noUnusedLocals` and `noUnusedParameters`

### Architecture

- Separate concerns: API calls, DOM rendering, and state management in distinct modules
- No framework — vanilla DOM APIs with TypeScript
- Functions MUST be pure when possible — side effects only in explicitly labeled handlers
- Error handling: all async operations MUST have try/catch with user-facing error messages

### Naming

- Functions: `camelCase` (e.g., `fetchUserProfile`)
- Types/Interfaces: `PascalCase` (e.g., `UserProfile`, `RepoData`)
- Constants: `UPPER_SNAKE_CASE` for env-like values, `camelCase` for regular constants
- Files: `kebab-case` (e.g., `github-api.ts`, `profile-card.ts`)

### CSS

- BEM naming convention (block__element--modifier)
- Mobile-first responsive design
- CSS custom properties for theming
- No CSS frameworks — hand-written styles

### Testing

- Every public function MUST have at least one test
- Use Given/When/Then naming for test descriptions
- Mock external API calls — never hit real GitHub API in tests
- Test both happy path and error scenarios

### Git

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Never commit `dist/` or `node_modules/`
- Keep commits focused — one logical change per commit

## Rules for GGA Review

1. **No `any` type** — use `unknown` with type guards instead
2. **No `console.log` in production code** — use typed error handlers
3. **No inline styles** — all styles in CSS files
4. **No hardcoded API URLs** — use a config module
5. **All async functions MUST handle errors** — no unhandled rejections
6. **Functions under 40 lines** — split if longer
7. **No magic numbers** — extract to named constants
8. **Accessible HTML** — semantic tags, aria labels, keyboard navigation