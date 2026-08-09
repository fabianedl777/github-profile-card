import { createElement, clearChildren } from './utils/dom';

const FAVORITES_KEY = 'favorites';

export function getFavorites(): string[] {
  const raw = localStorage.getItem(FAVORITES_KEY);
  if (!raw) {
    return [];
  }
  return JSON.parse(raw) as string[];
}

export function saveFavorite(username: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(username)) {
    favorites.push(username);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(username: string): void {
  const favorites = getFavorites().filter((f) => f !== username);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(username: string): boolean {
  return getFavorites().includes(username);
}

export function renderFavorites(
  container: HTMLElement,
  onFavoriteClick: (username: string) => void,
  onFavoriteRemove: (username: string) => void
): void {
  const list = container.querySelector('#favorites-list') as HTMLElement | null;
  const emptyMsg = container.querySelector('#favorites-empty') as HTMLElement | null;
  const favorites = getFavorites();

  if (!list || !emptyMsg) {
    return;
  }

  clearChildren(list);

  if (favorites.length === 0) {
    emptyMsg.classList.remove('favorites__empty--hidden');
    return;
  }

  emptyMsg.classList.add('favorites__empty--hidden');

  for (const username of favorites) {
    const item = createElement('li', ['favorites__item']);

    const link = createElement('button', ['favorites__link'], username, {
      'aria-label': `Search ${username}`,
    });
    link.addEventListener('click', () => onFavoriteClick(username));
    link.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onFavoriteClick(username);
      }
    });

    const removeBtn = createElement('button', ['favorites__remove'], '×', {
      'aria-label': `Remove ${username} from favorites`,
    });
    removeBtn.addEventListener('click', () => onFavoriteRemove(username));

    item.append(link, removeBtn);
    list.appendChild(item);
  }
}