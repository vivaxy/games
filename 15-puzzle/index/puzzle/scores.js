import {
  browserEvents,
  gridSize,
  gridX,
  gridY,
  storageKeys,
  tileTextColor,
} from '../configs.js';
import ScoreHistory, { DNF, getStatistics } from '../score-history.js';
import { formatTime } from './timer.js';

const finishDate = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'short',
  timeStyle: 'medium',
});

function formatScore(value) {
  if (value === null) return '—';
  return value === DNF ? DNF : formatTime(value);
}

export default class Scores {
  constructor({ ctx }) {
    this.ctx = ctx;
    this.history = new ScoreHistory();
    this.panel = document.querySelector('.score-container');
    this.statisticsBody = this.panel.querySelector('.js-statistics');
    this.attemptsBody = this.panel.querySelector('.js-attempts');
    this.storageStatus = this.panel.querySelector('.js-storage-status');
    for (const type of [
      browserEvents.TOUCH_START,
      browserEvents.TOUCH_MOVE,
      browserEvents.TOUCH_END,
      browserEvents.TOUCH_CANCEL,
    ]) {
      this.panel.addEventListener(type, (event) => event.stopPropagation(), {
        passive: true,
      });
    }
    window.addEventListener('storage', (event) => {
      if (
        event.key === null ||
        event.key.startsWith(storageKeys.ATTEMPT_PREFIX)
      ) {
        this.history.reload();
        this.update();
      }
    });
    this.update();
  }

  record(attempt) {
    this.history.add(attempt);
    this.update();
  }

  update() {
    this.statistics = getStatistics(this.history.attempts);
    const { Single, Ao5, Ao12 } = this.statistics;
    this.summary = [
      ['Ao5', formatScore(Ao5.current)],
      ['Ao12', formatScore(Ao12.current)],
      ['Best Single', formatScore(Single.best)],
    ];
    if (this.panel.open) this.renderPanel();
  }

  render() {
    const { ctx, summary } = this;
    const width = gridSize / summary.length;
    const top = gridY + gridSize;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = tileTextColor;
    summary.forEach(([label, value], index) => {
      const x = gridX + (index + 0.5) * width;
      ctx.font = '30px serif';
      ctx.fillText(label, x, top + 44);
      ctx.font = '40px serif';
      ctx.fillText(value, x, top + 90, width - 10);
    });
  }

  open() {
    this.renderPanel();
    this.panel.showModal();
  }

  renderPanel() {
    this.storageStatus.hidden = !this.history.storageUnavailable;
    this.statisticsBody.replaceChildren();
    for (const [name, { current, best }] of Object.entries(this.statistics)) {
      const row = this.statisticsBody.insertRow();
      const label = document.createElement('th');
      label.scope = 'row';
      label.textContent = name;
      row.append(label);
      row.insertCell().textContent = formatScore(current);
      row.insertCell().textContent = formatScore(best);
    }

    const { attempts } = this.history;
    this.attemptsBody.replaceChildren();
    if (attempts.length === 0) {
      const cell = this.attemptsBody.insertRow().insertCell();
      cell.colSpan = 3;
      cell.textContent = 'No attempts yet.';
    }
    for (let i = attempts.length - 1; i >= 0; i--) {
      const { dnf, timeMs, steps, endedAt } = attempts[i];
      const row = this.attemptsBody.insertRow();
      const time = formatTime(timeMs);
      row.insertCell().textContent = dnf ? `${DNF} (${time})` : time;
      row.insertCell().textContent = String(steps);
      row.insertCell().textContent = finishDate.format(endedAt);
    }
  }
}
