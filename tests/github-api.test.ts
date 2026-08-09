import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchUserProfile, fetchTopRepos, getCached, setCached, clearCache } from '../src/github-api';
import type { UserProfile, Repo } from '../src/types';

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

const mockRepos: Repo[] = [
  { name: 'linux', description: 'Linux kernel', stargazers_count: 180000, language: 'C', html_url: 'https://github.com/torvalds/linux' },
  { name: 'subsurface', description: 'Dive log', stargazers_count: 500, language: 'C', html_url: 'https://github.com/torvalds/subsurface' },
];

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('fetchUserProfile', () => {
  it('fetches and returns user profile on 200', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockUser,
    } as Response);

    const result = await fetchUserProfile('torvalds');
    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('https://api.github.com/users/torvalds');
  });

  it('throws "User not found" on 404', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not Found' }),
    } as Response);

    await expect(fetchUserProfile('nonexistent')).rejects.toThrow('User \'nonexistent\' not found on GitHub');
  });

  it('throws rate limit error on 403', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 403,
      headers: new Headers({ 'x-ratelimit-remaining': '0' }),
      json: async () => ({ message: 'API rate limit exceeded' }),
    } as Response);

    await expect(fetchUserProfile('torvalds')).rejects.toThrow('GitHub API rate limit reached. Try again later.');
  });

  it('throws network error on fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(fetchUserProfile('torvalds')).rejects.toThrow('Network error. Check your connection and try again.');
  });

  it('returns cached response when cache is valid', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    setCached('user:torvalds', mockUser);

    const result = await fetchUserProfile('torvalds');
    expect(result).toEqual(mockUser);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('fetches fresh data when cache is expired', async () => {
    const expired = Date.now() - 11 * 60 * 1000;
    localStorage.setItem('user:torvalds', JSON.stringify({ data: mockUser, timestamp: expired }));

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockUser,
    } as Response);

    const result = await fetchUserProfile('torvalds');
    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('fetchTopRepos', () => {
  it('fetches top repos sorted by stars', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockRepos,
    } as Response);

    const result = await fetchTopRepos('torvalds');
    expect(result).toEqual(mockRepos);
    expect(fetch).toHaveBeenCalledWith('https://api.github.com/users/torvalds/repos?sort=stars&per_page=5');
  });

  it('returns empty array when user has no repos', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => [],
    } as Response);

    const result = await fetchTopRepos('emptyuser');
    expect(result).toEqual([]);
  });

  it('throws error on failed request', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not Found' }),
    } as Response);

    await expect(fetchTopRepos('nonexistent')).rejects.toThrow();
  });
});

describe('cache helpers', () => {
  it('getCached returns null for missing key', () => {
    expect(getCached('user:nonexistent')).toBeNull();
  });

  it('setCached and getCached round trip', () => {
    setCached('user:test', mockUser);
    expect(getCached('user:test')).toEqual(mockUser);
  });

  it('clearCache removes all cached entries', () => {
    setCached('user:torvalds', mockUser);
    setCached('repos:torvalds', mockRepos);
    clearCache();
    expect(getCached('user:torvalds')).toBeNull();
    expect(getCached('repos:torvalds')).toBeNull();
  });
});