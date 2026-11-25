import assert from 'node:assert/strict';
import test from 'node:test';
import { storageKeys } from '../index/configs.js';
import ScoreHistory, { DNF, getStatistics } from '../index/score-history.js';
import Timer from '../index/puzzle/timer.js';

function stats(...times) {
  const attempts = times.map((timeMs) => ({
    dnf: timeMs === DNF,
    timeMs: timeMs === DNF ? 777 : timeMs,
  }));
  return getStatistics(attempts);
}

test('missing results and DNF have distinct values, including a zero-time solve', () => {
  assert.deepEqual(stats().Single, { current: null, best: null });
  assert.deepEqual(stats(DNF).Single, { current: DNF, best: null });
  assert.deepEqual(stats(0, DNF).Single, { current: DNF, best: 0 });
  assert.deepEqual(stats(1, 2, 3, 4).Ao5, { current: null, best: null });
});

test('Ao5 rolls forward one attempt and keeps the fastest earlier average', () => {
  const first = [10000, 11000, 12000, 13000, 40000];
  assert.deepEqual(stats(...first).Ao5, { current: 12000, best: 12000 });
  assert.deepEqual(stats(...first, 80000).Ao5, {
    current: 21667,
    best: 12000,
  });
  assert.equal(stats(1000, 1000, 2000, 4000, 4000).Ao5.current, 2333);
});

test('one DNF fills the worst slot and a second invalidates the window', () => {
  assert.equal(stats(10000, 11000, 12000, 13000, DNF).Ao5.current, 12000);
  assert.deepEqual(stats(10000, 11000, 12000, DNF, DNF).Ao5, {
    current: DNF,
    best: null,
  });
  assert.deepEqual(stats(10000, 11000, 12000, 13000, DNF, DNF).Ao5, {
    current: DNF,
    best: 12000,
  });
  assert.deepEqual(stats(DNF, DNF, 1000, 2000, 3000, 4000).Ao5, {
    current: 3000,
    best: 3000,
  });
});

test('Ao12 trims one result on either end and rounds the remaining ten to milliseconds', () => {
  const first = Array.from({ length: 11 }, (_, index) => 1000 + index);
  assert.deepEqual(stats(...first).Ao12, { current: null, best: null });
  assert.deepEqual(stats(...first, 9000).Ao12, { current: 1006, best: 1006 });
  assert.deepEqual(stats(...first, 9000, 10000).Ao12, {
    current: 1805,
    best: 1006,
  });
  assert.equal(stats(...first, DNF).Ao12.current, 1006);
  assert.equal(stats(...first, DNF, DNF).Ao12.current, DNF);
});

test('stop samples the final move between frames and keeps that time until reset', (t) => {
  let now = 0;
  t.mock.method(performance, 'now', () => now);
  const timer = new Timer({});
  timer.start();
  now = 107.4;
  timer.update();
  assert.equal(timer.getTime(), 107);
  now = 119.75;
  timer.stop();
  now = 1000;
  timer.update();
  assert.equal(timer.getTime(), 119);
  timer.reset();
  assert.equal(timer.getTime(), 0);
});

test('independent writers reload in order and unsaved attempts survive storage errors in the tab', (t) => {
  const entries = new Map();
  const storage = {
    get length() {
      return entries.size;
    },
    key: (i) => [...entries.keys()][i],
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
  };
  globalThis.window = { localStorage: storage };
  t.after(() => {
    delete globalThis.window;
  });
  const first = new ScoreHistory();
  const second = new ScoreHistory();
  const attempt = { timeMs: 1000, steps: 3, endedAt: 100, dnf: false };
  first.add(attempt);
  first.add({ ...attempt, timeMs: 1001 });
  second.add({ ...attempt, endedAt: 101, dnf: true });
  assert.equal(entries.size, 3);
  storage.setItem(storageKeys.USERNAME, 'player');
  storage.setItem(storageKeys.ATTEMPT_PREFIX + 'damaged', '{');
  storage.setItem(storageKeys.ATTEMPT_PREFIX + 'incomplete', '{}');
  first.reload();
  assert.deepEqual(
    first.attempts.map((entry) => entry.timeMs),
    [1000, 1001, 1000],
  );
  assert.equal(first.attempts[2].dnf, true);
  t.mock.method(storage, 'setItem', () => {
    throw new Error('Storage full');
  });
  first.add({ ...attempt, endedAt: 102 });
  first.reload();
  assert.equal(first.storageUnavailable, true);
  assert.equal(first.attempts.length, 4);
  assert.equal(new ScoreHistory().attempts.length, 3);
});
