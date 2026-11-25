import { storageKeys } from './configs.js';

export const DNF = 'DNF';

function summarize(times, size) {
  let current = null;
  let best = null;
  for (let end = size; end <= times.length; end++) {
    current = times[end - 1];
    if (size > 1) {
      const sorted = times.slice(end - size, end).sort((a, b) => a - b);
      const middle = sorted.slice(1, -1);
      const sum = middle.reduce((total, time) => total + time, 0);
      current = Math.round(sum / middle.length);
    }
    if (Number.isFinite(current) && (best === null || current < best)) {
      best = current;
    }
  }
  return { current: current === Infinity ? DNF : current, best };
}

export function getStatistics(attempts) {
  // A DNF sorts last and makes the average a DNF if it survives trimming.
  const times = attempts.map(({ dnf, timeMs }) => (dnf ? Infinity : timeMs));
  return {
    Single: summarize(times, 1),
    Ao5: summarize(times, 5),
    Ao12: summarize(times, 12),
  };
}

function readAttempt(value) {
  try {
    const attempt = JSON.parse(value);
    if (
      attempt &&
      typeof attempt.dnf === 'boolean' &&
      Number.isSafeInteger(attempt.timeMs) &&
      attempt.timeMs >= 0 &&
      Number.isSafeInteger(attempt.steps) &&
      attempt.steps > 0 &&
      Number.isSafeInteger(attempt.endedAt) &&
      Number.isFinite(new Date(attempt.endedAt).getTime())
    ) {
      return attempt;
    }
  } catch {
    // A damaged entry can be skipped independently of the remaining attempts.
  }
  return null;
}

function byFinishTime(a, b) {
  return a.endedAt - b.endedAt || a.key.localeCompare(b.key);
}

export default class ScoreHistory {
  constructor() {
    this.attempts = [];
    this.unsaved = [];
    this.tabId = crypto.getRandomValues(new Uint32Array(3)).join('-');
    this.sequence = 0;
    this.reload();
  }

  reload() {
    try {
      const storage = window.localStorage;
      const attempts = this.unsaved.slice();
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key?.startsWith(storageKeys.ATTEMPT_PREFIX)) {
          const attempt = readAttempt(storage.getItem(key));
          if (attempt) attempts.push({ ...attempt, key });
        }
      }
      this.attempts = attempts.sort(byFinishTime);
      this.readFailed = false;
    } catch {
      this.readFailed = true;
    }
  }

  add(attempt) {
    const sequence = String(this.sequence++).padStart(12, '0');
    const key = `${storageKeys.ATTEMPT_PREFIX}${this.tabId}/${sequence}`;
    const entry = { ...attempt, key };
    try {
      window.localStorage.setItem(key, JSON.stringify(attempt));
    } catch {
      this.unsaved.push(entry);
    }
    this.attempts.push(entry);
    this.attempts.sort(byFinishTime);
  }

  get storageUnavailable() {
    return this.readFailed || this.unsaved.length > 0;
  }
}
