import { describe, it, expect } from 'vitest';
import { createElement, clearChildren } from '../src/utils/dom';

describe('createElement', () => {
  it('creates an element with tag name', () => {
    const el = createElement('div');
    expect(el.tagName).toBe('DIV');
  });

  it('creates an element with class names', () => {
    const el = createElement('span', ['profile__name', 'profile__name--active']);
    expect(el.className).toBe('profile__name profile__name--active');
  });

  it('creates an element with text content', () => {
    const el = createElement('p', [], 'Hello world');
    expect(el.textContent).toBe('Hello world');
  });

  it('creates an element with attributes', () => {
    const el = createElement('img', [], '', { src: 'https://example.com/avatar.png', alt: 'Avatar' });
    expect(el.getAttribute('src')).toBe('https://example.com/avatar.png');
    expect(el.getAttribute('alt')).toBe('Avatar');
  });

  it('creates an element with all options', () => {
    const el = createElement('a', ['repo__name'], 'My Repo', { href: 'https://github.com/repo', target: '_blank' });
    expect(el.tagName).toBe('A');
    expect(el.className).toBe('repo__name');
    expect(el.textContent).toBe('My Repo');
    expect(el.getAttribute('href')).toBe('https://github.com/repo');
    expect(el.getAttribute('target')).toBe('_blank');
  });
});

describe('clearChildren', () => {
  it('removes all children from an element', () => {
    const parent = document.createElement('div');
    parent.appendChild(document.createElement('p'));
    parent.appendChild(document.createElement('span'));
    parent.appendChild(document.createElement('img'));

    clearChildren(parent);

    expect(parent.children.length).toBe(0);
  });

  it('does nothing on an empty element', () => {
    const parent = document.createElement('div');
    clearChildren(parent);
    expect(parent.children.length).toBe(0);
  });
});