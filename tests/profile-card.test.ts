import { describe, it, expect, beforeEach } from 'vitest';
import { renderProfile, renderError, renderLoading } from '../src/profile-card';
import type { UserProfile } from '../src/types';

const mockUser: UserProfile = {
  login: 'torvalds',
  avatar_url: 'https://avatars.githubusercontent.com/u/1024025',
  name: 'Linus Torvalds',
  bio: 'Linux creator',
  location: 'Portland, OR',
  company: 'Linux Foundation',
  blog: 'https://torvalds.github.io',
  followers: 200000,
  following: 5,
  public_repos: 10,
};

beforeEach(() => {
  document.body.innerHTML = '<section class="profile" id="profile-container"></section>';
});

describe('renderProfile', () => {
  it('renders avatar with src and alt', () => {
    const container = document.getElementById('profile-container')!;
    renderProfile(container, mockUser, false);
    const avatar = container.querySelector('.profile__avatar') as HTMLImageElement;
    expect(avatar).not.toBeNull();
    expect(avatar.src).toBe(mockUser.avatar_url);
    expect(avatar.alt).toBe(mockUser.name);
  });

  it('renders name and login', () => {
    const container = document.getElementById('profile-container')!;
    renderProfile(container, mockUser, false);
    expect(container.querySelector('.profile__name')?.textContent).toBe('Linus Torvalds');
    expect(container.querySelector('.profile__login')?.textContent).toBe('@torvalds');
  });

  it('renders bio', () => {
    const container = document.getElementById('profile-container')!;
    renderProfile(container, mockUser, false);
    expect(container.querySelector('.profile__bio')?.textContent).toBe('Linux creator');
  });

  it('shows placeholder for null bio', () => {
    const container = document.getElementById('profile-container')!;
    renderProfile(container, { ...mockUser, bio: null }, false);
    expect(container.querySelector('.profile__bio')?.textContent).toBe('No bio available');
  });

  it('shows placeholder for null location', () => {
    const container = document.getElementById('profile-container')!;
    renderProfile(container, { ...mockUser, location: null }, false);
    const meta = container.querySelector('.profile__meta');
    expect(meta?.textContent).toContain('No location');
  });

  it('renders stats: followers, following, public_repos', () => {
    const container = document.getElementById('profile-container')!;
    renderProfile(container, mockUser, false);
    const stats = container.querySelectorAll('.profile__stat-value');
    expect(stats[0].textContent).toBe('200000');
    expect(stats[1].textContent).toBe('5');
    expect(stats[2].textContent).toBe('10');
  });

  it('renders save button', () => {
    const container = document.getElementById('profile-container')!;
    renderProfile(container, mockUser, false);
    const btn = container.querySelector('.profile__save-btn');
    expect(btn).not.toBeNull();
    expect(btn?.textContent).toBe('Save to Favorites');
  });

  it('shows saved state when already favorite', () => {
    const container = document.getElementById('profile-container')!;
    renderProfile(container, mockUser, true);
    const btn = container.querySelector('.profile__save-btn');
    expect(btn?.classList.contains('profile__save-btn--saved')).toBe(true);
    expect(btn?.textContent).toBe('Saved');
  });
});

describe('renderError', () => {
  it('renders error message', () => {
    const container = document.getElementById('profile-container')!;
    renderError(container, 'User not found');
    const error = container.querySelector('.profile__error');
    expect(error).not.toBeNull();
    expect(error?.textContent).toBe('User not found');
  });
});

describe('renderLoading', () => {
  it('renders loading indicator', () => {
    const container = document.getElementById('profile-container')!;
    renderLoading(container);
    const loading = container.querySelector('.profile__loading');
    expect(loading).not.toBeNull();
  });
});