import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getTheme, setTheme, toggleTheme, initTheme } from '../src/theme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  vi.restoreAllMocks();
});

describe('getTheme', () => {
  it('Given localStorage has "dark", when getTheme is called, then it returns "dark"', () => {
    localStorage.setItem('theme', 'dark');
    expect(getTheme()).toBe('dark');
  });

  it('Given localStorage has "light", when getTheme is called, then it returns "light"', () => {
    localStorage.setItem('theme', 'light');
    expect(getTheme()).toBe('light');
  });

  it('Given no saved preference and OS prefers dark, when getTheme is called, then it returns "dark"', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    expect(getTheme()).toBe('dark');
  });

  it('Given no saved preference and OS prefers light, when getTheme is called, then it returns "light"', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    expect(getTheme()).toBe('light');
  });
});

describe('setTheme', () => {
  it('Given setTheme is called with "dark", when it executes, then data-theme attribute is set to "dark"', () => {
    setTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('Given setTheme is called with "light", when it executes, then theme is saved to localStorage', () => {
    setTheme('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});

describe('toggleTheme', () => {
  it('Given current theme is dark, when toggleTheme is called, then it switches to light', () => {
    setTheme('dark');
    const result = toggleTheme();
    expect(result).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('Given current theme is light, when toggleTheme is called, then it switches to dark', () => {
    setTheme('light');
    const result = toggleTheme();
    expect(result).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});

describe('initTheme', () => {
  it('Given localStorage has "light", when initTheme is called, then data-theme is set to "light"', () => {
    localStorage.setItem('theme', 'light');
    initTheme();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('Given no saved theme and OS prefers dark, when initTheme is called, then data-theme is set to "dark"', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    initTheme();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});