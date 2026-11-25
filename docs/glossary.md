# Games glossary

| Term                           | Definition                                                                                                           | Avoid |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ----- |
| Games home page                | The collection entry at `/games/` where players choose a destination from the menu.                                  | —     |
| menu                           | The ordered list of names and destinations in `menu.json`. It includes both game pages and the saved solver answers. | —     |
| game page                      | A playable browser game served by an `index.html` in its own directory, such as `15-puzzle/`.                        | —     |
| Calculator The Game Solver     | The Node.js program that searches the levels in `levels.json` and writes solutions to `answers.json`.                | —     |
| vivaxy.github.io               | The parent GitHub Pages site that supplies shared assets at the origin root, including `/index.js` and `/index.css`. | —     |
| `@vivaxy/github-pages-scripts` | The development package that provides the `gps` command for generating the README and sitemap.                       | —     |
| Table of contents              | The list in the root README that `gps toc` builds from the titles and descriptions of game pages.                    | —     |

## 15 Puzzle

| Term                 | Definition                                                                             | Avoid |
| -------------------- | -------------------------------------------------------------------------------------- | ----- |
| Single               | The result of one timed attempt.                                                       | —     |
| Ao5 (Average of 5)   | The average of five consecutive attempts after removing one fastest and one slowest.   | avg5  |
| Ao12 (Average of 12) | The average of twelve consecutive attempts after removing one fastest and one slowest. | avg12 |
| Best                 | The player's fastest valid Single, Ao5 or Ao12 in this browser's history.              | —     |
| DNF (Did Not Finish) | The result of restarting an attempt after its first legal move.                        | —     |
