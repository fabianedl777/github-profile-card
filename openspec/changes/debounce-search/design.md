# Design: Debounce Search

## Architecture

```
src/
├── utils/
│   └── debounce.ts   # NEW: reusable debounce function
└── main.ts            # MODIFIED: wire input event with debounce
```

## Key Decisions

### Decision 1: Debounce utility is reusable
**Choice:** Generic `debounce(fn, delay)` function in `src/utils/debounce.ts`.
**Rationale:** Reusable for future features. Pure utility, easy to test.
**Tradeoff:** None.

### Decision 2: 500ms default delay
**Choice:** 500ms debounce delay.
**Rationale:** Fast enough to feel instant, slow enough to avoid excessive API calls.
**Tradeoff:** Could feel sluggish for fast typists. Acceptable for MVP.

### Decision 3: Keep submit button
**Choice:** Submit button remains and bypasses debounce.
**Rationale:** Users may want to force search immediately. Also good for accessibility.
**Tradeoff:** Two paths to trigger search. Handle by cancelling pending debounce on submit.

## Data Flow

```
User types in search input:
  → input event fires
  → debounce timer starts (500ms)
  → if new keystroke arrives, cancel and restart timer
  → when timer completes, call handleSearch(value)

User presses Search button:
  → submit event fires
  → cancel any pending debounced search
  → call handleSearch(value) immediately
```

## TypeScript Interfaces

```typescript
type DebouncedFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): DebouncedFunction<T>;
```

## File Responsibilities

| File | Responsibility |
|------|---------------|
| `src/utils/debounce.ts` | `debounce()` function with cancel |
| `src/main.ts` | Wire input event with debounced handleSearch, cancel on submit |

## Testing Strategy

- **Unit tests:** `debounce.ts` — debounce timing, cancellation, leading/trailing calls
- **TDD:** RED → GREEN → REFACTOR