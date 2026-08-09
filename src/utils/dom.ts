type ElementAttrs = Record<string, string>;

export function createElement(
  tag: string,
  classes: string[] = [],
  text: string = '',
  attrs: ElementAttrs = {}
): HTMLElement {
  const el = document.createElement(tag);

  if (classes.length > 0) {
    el.className = classes.join(' ');
  }

  if (text) {
    el.textContent = text;
  }

  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }

  return el;
}

export function clearChildren(el: HTMLElement): void {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}