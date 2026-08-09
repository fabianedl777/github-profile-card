import type { Repo } from './types.js';
import { createElement, clearChildren } from './utils/dom.js';

export function renderRepos(container: HTMLElement, repos: Repo[]): void {
  clearChildren(container);

  const title = createElement('h2', ['repos__title'], 'Top Repositories');
  container.appendChild(title);

  for (const repo of repos) {
    const item = createElement('div', ['repo']);

    const name = createElement('a', ['repo__name'], repo.name, {
      href: repo.html_url,
      target: '_blank',
      rel: 'noopener noreferrer',
    });

    const desc = createElement('p', ['repo__desc'], repo.description ?? 'No description');

    const meta = createElement('div', ['repo__meta']);
    const stars = createElement('span', ['repo__stars'], `★ ${repo.stargazers_count}`);
    const lang = createElement('span', ['repo__lang'], repo.language ?? 'N/A');
    meta.append(stars, lang);

    item.append(name, desc, meta);
    container.appendChild(item);
  }
}

export function renderEmptyRepos(container: HTMLElement): void {
  clearChildren(container);
  const msg = createElement('p', ['repos__empty'], 'No public repositories');
  container.appendChild(msg);
}