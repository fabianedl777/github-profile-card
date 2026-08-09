import { describe, it, expect, beforeEach } from 'vitest';
import { renderRepos, renderEmptyRepos } from '../src/repo-list';
import type { Repo } from '../src/types';

const mockRepos: Repo[] = [
  { name: 'linux', description: 'Linux kernel', stargazers_count: 180000, language: 'C', html_url: 'https://github.com/torvalds/linux' },
  { name: 'subsurface', description: 'Dive log', stargazers_count: 500, language: 'C', html_url: 'https://github.com/torvalds/subsurface' },
];

beforeEach(() => {
  document.body.innerHTML = '<section class="repos" id="repos-container"></section>';
});

describe('renderRepos', () => {
  it('renders repo items', () => {
    const container = document.getElementById('repos-container')!;
    renderRepos(container, mockRepos);
    const items = container.querySelectorAll('.repo');
    expect(items.length).toBe(2);
  });

  it('renders repo name as link', () => {
    const container = document.getElementById('repos-container')!;
    renderRepos(container, mockRepos);
    const link = container.querySelector('.repo__name') as HTMLAnchorElement;
    expect(link).not.toBeNull();
    expect(link.textContent).toBe('linux');
    expect(link.href).toBe('https://github.com/torvalds/linux');
    expect(link.target).toBe('_blank');
  });

  it('renders repo description', () => {
    const container = document.getElementById('repos-container')!;
    renderRepos(container, mockRepos);
    const desc = container.querySelectorAll('.repo__desc');
    expect(desc[0].textContent).toBe('Linux kernel');
  });

  it('shows placeholder for null description', () => {
    const container = document.getElementById('repos-container')!;
    renderRepos(container, [{ ...mockRepos[0], description: null }]);
    const desc = container.querySelector('.repo__desc');
    expect(desc?.textContent).toBe('No description');
  });

  it('renders stars count', () => {
    const container = document.getElementById('repos-container')!;
    renderRepos(container, mockRepos);
    const stars = container.querySelectorAll('.repo__stars');
    expect(stars[0].textContent).toContain('180000');
  });

  it('renders language', () => {
    const container = document.getElementById('repos-container')!;
    renderRepos(container, mockRepos);
    const lang = container.querySelectorAll('.repo__lang');
    expect(lang[0].textContent).toBe('C');
  });

  it('shows placeholder for null language', () => {
    const container = document.getElementById('repos-container')!;
    renderRepos(container, [{ ...mockRepos[0], language: null }]);
    const lang = container.querySelector('.repo__lang');
    expect(lang?.textContent).toBe('N/A');
  });
});

describe('renderEmptyRepos', () => {
  it('renders empty message', () => {
    const container = document.getElementById('repos-container')!;
    renderEmptyRepos(container);
    const msg = container.querySelector('.repos__empty');
    expect(msg).not.toBeNull();
    expect(msg?.textContent).toBe('No public repositories');
  });
});