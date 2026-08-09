import { describe, it, expect, beforeEach } from 'vitest';
import { getFavorites, saveFavorite, removeFavorite, isFavorite, renderFavorites } from '../src/favorites';

beforeEach(() => {
  localStorage.clear();
});

describe('getFavorites', () => {
  it('returns empty array when no favorites stored', () => {
    expect(getFavorites()).toEqual([]);
  });

  it('returns stored favorites', () => {
    localStorage.setItem('favorites', JSON.stringify(['torvalds', 'gaearon']));
    expect(getFavorites()).toEqual(['torvalds', 'gaearon']);
  });
});

describe('saveFavorite', () => {
  it('adds username to favorites', () => {
    saveFavorite('torvalds');
    expect(getFavorites()).toEqual(['torvalds']);
  });

  it('does not add duplicates', () => {
    saveFavorite('torvalds');
    saveFavorite('torvalds');
    expect(getFavorites()).toEqual(['torvalds']);
  });

  it('appends to existing favorites', () => {
    saveFavorite('torvalds');
    saveFavorite('gaearon');
    expect(getFavorites()).toEqual(['torvalds', 'gaearon']);
  });
});

describe('removeFavorite', () => {
  it('removes username from favorites', () => {
    saveFavorite('torvalds');
    saveFavorite('gaearon');
    removeFavorite('torvalds');
    expect(getFavorites()).toEqual(['gaearon']);
  });

  it('does nothing if username not in favorites', () => {
    saveFavorite('torvalds');
    removeFavorite('gaearon');
    expect(getFavorites()).toEqual(['torvalds']);
  });
});

describe('isFavorite', () => {
  it('returns true when username is in favorites', () => {
    saveFavorite('torvalds');
    expect(isFavorite('torvalds')).toBe(true);
  });

  it('returns false when username is not in favorites', () => {
    expect(isFavorite('gaearon')).toBe(false);
  });
});

describe('renderFavorites', () => {
  it('renders favorites list with items', () => {
    saveFavorite('torvalds');
    saveFavorite('gaearon');

    const container = document.createElement('div');
    container.innerHTML = '<ul id="favorites-list"></ul><p class="favorites__empty" id="favorites-empty"></p>';
    document.body.appendChild(container);

    const onFavoriteClick = vi.fn();
    const onFavoriteRemove = vi.fn();
    renderFavorites(container, onFavoriteClick, onFavoriteRemove);

    const items = container.querySelectorAll('.favorites__item');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('torvalds');

    document.body.removeChild(container);
  });

  it('shows empty message when no favorites', () => {
    const container = document.createElement('div');
    container.innerHTML = '<ul id="favorites-list"></ul><p class="favorites__empty" id="favorites-empty"></p>';
    document.body.appendChild(container);

    renderFavorites(container, vi.fn(), vi.fn());

    const emptyMsg = container.querySelector('#favorites-empty');
    expect(emptyMsg).not.toBeNull();

    document.body.removeChild(container);
  });
});