import type { UserProfile, Repo, CachedResponse } from './types';
import { CACHE_TTL_MS } from './types';
import { API_BASE_URL, TOP_REPOS_COUNT } from './config';

export async function fetchUserProfile(username: string): Promise<UserProfile> {
  const cacheKey = `user:${username}`;
  const cached = getCached<UserProfile>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${username}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User '${username}' not found on GitHub`);
      }
      if (response.status === 403) {
        throw new Error('GitHub API rate limit reached. Try again later.');
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data: UserProfile = await response.json();
    setCached(cacheKey, data);
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error. Check your connection and try again.');
    }
    throw error;
  }
}

export async function fetchTopRepos(username: string): Promise<Repo[]> {
  const cacheKey = `repos:${username}`;
  const cached = getCached<Repo[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${username}/repos?sort=stars&per_page=${TOP_REPOS_COUNT}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch repos: ${response.status}`);
    }

    const data: Repo[] = await response.json();
    setCached(cacheKey, data);
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error. Check your connection and try again.');
    }
    throw error;
  }
}

export function getCached<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return null;
  }

  const parsed: CachedResponse<T> = JSON.parse(raw);
  const age = Date.now() - parsed.timestamp;

  if (age > CACHE_TTL_MS) {
    localStorage.removeItem(key);
    return null;
  }

  return parsed.data;
}

export function setCached<T>(key: string, data: T): void {
  const entry: CachedResponse<T> = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(entry));
}

export function clearCache(): void {
  const keys = Object.keys(localStorage).filter(
    (key) => key.startsWith('user:') || key.startsWith('repos:')
  );
  for (const key of keys) {
    localStorage.removeItem(key);
  }
}