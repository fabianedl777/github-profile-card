export interface UserProfile {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

export interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}

export interface CachedResponse<T> {
  data: T;
  timestamp: number;
}

export const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes