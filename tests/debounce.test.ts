import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from '../src/utils/debounce';

const DELAY_MS = 500;
const SHORT_WAIT_MS = 300;
const BRIEF_WAIT_MS = 200;
const KEYSTROKE_INTERVAL_MS = 50;
const KEYSTROKE_COUNT = 10;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('debounce', () => {
  it('Given a function wrapped in debounce, when it is called once, then it executes after the delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, DELAY_MS);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY_MS);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('Given a debounced function called twice rapidly, when the second call arrives within the delay, then only the last call executes', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, DELAY_MS);

    debounced('a');
    vi.advanceTimersByTime(SHORT_WAIT_MS);
    debounced('b');

    vi.advanceTimersByTime(DELAY_MS);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('b');
  });

  it('Given a debounced function with a pending call, when cancel is called, then the pending call does not execute', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, DELAY_MS);

    debounced();
    debounced.cancel();

    vi.advanceTimersByTime(DELAY_MS);
    expect(fn).not.toHaveBeenCalled();
  });

  it('Given a debounced function called with arguments, when it executes, then it receives the last set of arguments', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, DELAY_MS);

    debounced('torvalds', 1);
    vi.advanceTimersByTime(BRIEF_WAIT_MS);
    debounced('gaearon', 2);

    vi.advanceTimersByTime(DELAY_MS);
    expect(fn).toHaveBeenCalledWith('gaearon', 2);
  });

  it('Given a debounced function, when called multiple times with rapid keystrokes, then it fires only once after the delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, DELAY_MS);

    for (let i = 0; i < KEYSTROKE_COUNT; i++) {
      debounced(`char${i}`);
      vi.advanceTimersByTime(KEYSTROKE_INTERVAL_MS);
    }

    vi.advanceTimersByTime(DELAY_MS);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('char9');
  });
});