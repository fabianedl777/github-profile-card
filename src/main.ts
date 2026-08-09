import { fetchUserProfile, fetchTopRepos } from './github-api.js';
import { renderProfile, renderError, renderLoading } from './profile-card.js';
import { renderRepos, renderEmptyRepos } from './repo-list.js';
import { saveFavorite, removeFavorite, isFavorite, renderFavorites } from './favorites.js';
import { initTheme, toggleTheme } from './theme.js';

function clearChildren(container: HTMLElement): void {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

interface SearchContext {
  profileContainer: HTMLElement;
  reposContainer: HTMLElement;
  favoritesContainer: HTMLElement;
}

function handleSave(
  user: { login: string },
  ctx: SearchContext
): void {
  if (isFavorite(user.login)) {
    return;
  }
  saveFavorite(user.login);
  const saveBtn = ctx.profileContainer.querySelector('.profile__save-btn') as HTMLButtonElement | null;
  if (saveBtn) {
    saveBtn.classList.add('profile__save-btn--saved');
    saveBtn.textContent = 'Saved';
  }
  renderFavorites(ctx.favoritesContainer, (u) => handleSearch(u, ctx), (u) => handleRemoveFavorite(u, ctx));
}

function handleRemoveFavorite(username: string, ctx: SearchContext): void {
  removeFavorite(username);
  renderFavorites(ctx.favoritesContainer, (u) => handleSearch(u, ctx), (u) => handleRemoveFavorite(u, ctx));

  const saveBtn = ctx.profileContainer.querySelector('.profile__save-btn');
  if (saveBtn && saveBtn.textContent === 'Saved') {
    const loginEl = ctx.profileContainer.querySelector('.profile__login');
    if (loginEl && loginEl.textContent === `@${username}`) {
      saveBtn.classList.remove('profile__save-btn--saved');
      saveBtn.textContent = 'Save to Favorites';
    }
  }
}

async function fetchAndRender(
  username: string,
  ctx: SearchContext
): Promise<void> {
  const user = await fetchUserProfile(username);
  const saved = isFavorite(user.login);
  renderProfile(ctx.profileContainer, user, saved);

  const saveBtn = ctx.profileContainer.querySelector('.profile__save-btn') as HTMLButtonElement | null;
  if (saveBtn) {
    saveBtn.addEventListener('click', () => handleSave(user, ctx));
  }

  try {
    const repos = await fetchTopRepos(user.login);
    if (repos.length === 0) {
      renderEmptyRepos(ctx.reposContainer);
    } else {
      renderRepos(ctx.reposContainer, repos);
    }
  } catch {
    renderEmptyRepos(ctx.reposContainer);
  }
}

function handleSearch(username: string, ctx: SearchContext): void {
  const trimmed = username.trim();
  if (!trimmed) {
    renderError(ctx.profileContainer, 'Please enter a GitHub username.');
    return;
  }

  renderLoading(ctx.profileContainer);
  clearChildren(ctx.reposContainer);

  fetchAndRender(trimmed, ctx).catch((error: unknown) => {
    const message = error instanceof Error ? error.message : 'Something went wrong.';
    renderError(ctx.profileContainer, message);
  });
}

function init(): void {
  initTheme();

  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const profileContainer = document.getElementById('profile-container');
  const reposContainer = document.getElementById('repos-container');
  const favoritesContainer = document.getElementById('favorites-container');

  if (!searchForm || !searchInput || !profileContainer || !reposContainer || !favoritesContainer) {
    return;
  }

  const ctx: SearchContext = { profileContainer, reposContainer, favoritesContainer };
  const search = (u: string) => handleSearch(u, ctx);
  const removeFav = (u: string) => handleRemoveFavorite(u, ctx);

  searchForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    search(searchInput.value);
  });

  renderFavorites(favoritesContainer, search, removeFav);

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = toggleTheme();
      themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
    });
    const current = document.documentElement.getAttribute('data-theme');
    themeToggle.textContent = current === 'dark' ? '🌙' : '☀️';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}