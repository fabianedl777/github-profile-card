import type { UserProfile } from './types.js';
import { createElement, clearChildren } from './utils/dom.js';

export function renderProfile(
  container: HTMLElement,
  user: UserProfile,
  isSaved: boolean
): void {
  clearChildren(container);

  const header = createElement('div', ['profile__header']);

  const avatar = createElement('img', ['profile__avatar'], '', {
    src: user.avatar_url,
    alt: user.name ?? user.login,
  });

  const info = createElement('div', ['profile__info']);
  const name = createElement('h2', ['profile__name'], user.name ?? user.login);
  const login = createElement('span', ['profile__login'], `@${user.login}`);
  const bio = createElement('p', ['profile__bio'], user.bio ?? 'No bio available');

  const meta = createElement('div', ['profile__meta']);
  const location = createElement('span', ['profile__meta-item'], user.location ?? 'No location');
  const company = createElement('span', ['profile__meta-item'], user.company ?? 'No company');
  const blog = user.blog
    ? createElement('a', ['profile__meta-item'], user.blog, { href: user.blog, target: '_blank' })
    : createElement('span', ['profile__meta-item'], 'No blog');
  meta.append(location, company, blog);

  info.append(name, login, bio, meta);
  header.append(avatar, info);

  const stats = createElement('div', ['profile__stats']);
  const followers = createStat('followers', user.followers.toString());
  const following = createStat('following', user.following.toString());
  const repos = createStat('public_repos', user.public_repos.toString());
  stats.append(followers, following, repos);

  const saveBtn = createElement('button', ['profile__save-btn'], 'Save to Favorites', {
    'aria-label': 'Save to favorites',
  });
  if (isSaved) {
    saveBtn.classList.add('profile__save-btn--saved');
    saveBtn.textContent = 'Saved';
  }

  container.append(header, stats, saveBtn);
}

function createStat(label: string, value: string): HTMLElement {
  const stat = createElement('div', ['profile__stat']);
  const val = createElement('span', ['profile__stat-value'], value);
  const lbl = createElement('span', ['profile__stat-label'], label);
  stat.append(val, lbl);
  return stat;
}

export function renderError(container: HTMLElement, message: string): void {
  clearChildren(container);
  const error = createElement('p', ['profile__error'], message);
  container.appendChild(error);
}

export function renderLoading(container: HTMLElement): void {
  clearChildren(container);
  const loading = createElement('div', ['profile__loading'], 'Loading...');
  container.appendChild(loading);
}