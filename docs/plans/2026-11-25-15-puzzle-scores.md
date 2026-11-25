# 15 Puzzle local scores

## Results

The first legal move starts an attempt. Solving the board records a Single at
the instant of the final move. Using Scramble during an attempt records a DNF
(Did Not Finish). Scrambling a ready or solved board starts a new puzzle.
Reloading or closing the page discards the unfinished attempt and keeps the
history of settled attempts.

| Score                | Current                                                                          | Best                                              |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------- |
| Single               | Result of the latest attempt                                                     | Fastest solved attempt                            |
| Ao5 (Average of 5)   | Latest five attempts, removing one fastest and one slowest, then averaging three | Fastest valid Ao5 across all consecutive windows  |
| Ao12 (Average of 12) | Latest twelve attempts, removing one fastest and one slowest, then averaging ten | Fastest valid Ao12 across all consecutive windows |

A DNF ranks last. One DNF takes the slowest slot. Two or more give the whole
window a DNF. Tied extremes each consume one slot. Times use whole milliseconds,
with averages rounded to the nearest millisecond. A missing result displays an
em dash. The Ao5 calculation follows the
[WCA regulations](https://www.worldcubeassociation.org/regulations/#9f8). Ao12
follows the default trim used by
[csTimer](https://github.com/cs0x7f/cstimer/blob/master/src/js/stats/timestat.js#L11-L29).

## Implementation

Save each attempt under its own game-specific localStorage key, including its
elapsed time, steps, finish time and DNF status. Keep an unsaved attempt in
memory and show its storage status in Scores.

Show current Ao5, current Ao12 and Best Single below the board. Scores shows
Current and Best for all three metrics followed by the history, newest first.
The timer continues while Scores is open. Map button coordinates using the
displayed canvas bounds in both portrait and landscape.

## Verification results

- All six tests passed with `node --test 15-puzzle/__tests__/scores.test.mjs` on
  Node 22. They cover rolling windows, DNF, tied times, millisecond rounding,
  final-move timing and storage failures.
- In Chromium at 390 × 844, touch input solved thirteen fixed scrambles with a
  controlled clock. Ao5 reached `0:12.000` on the fifth solve. The thirteenth
  solve changed current Ao12 from `0:15.500` to `0:18.400` and kept Best at
  `0:15.500`. The stored times and step counts matched the history after reload.
  A separate solve using the browser clock finished in 333 ms, within the
  measured input boundaries.
- Two tabs each abandoned a one-move attempt. Both DNFs appeared in storage,
  both rolling averages became DNF and their earlier bests survived. A later
  Single of `0:09.000` appeared in the other tab's open Scores panel. Reloading
  or closing an active attempt preserved the number of settled attempts.
- Touch scrolling worked in portrait. At 1280 × 800, the mouse hit the Scores
  button on the centered canvas, scrolled the history and closed it. Play
  resumed after closing the panel. With localStorage disabled, the panel showed
  the storage notice and the in-memory result of `0:12.345`.
