# ADR: Documentation boundaries

- Date: 2026-11-25
- Status: Accepted
- Related decisions: []
- Impact scope: Player instructions, engineering documentation and skill
  registration in Games.

## Background

Players open games from the root README. The pre-commit hook runs `gps toc`,
which rebuilds that file from the configured introduction and HTML metadata. A
contributor who edits only the generated Markdown can lose the edit on the next
run. [README generation configuration](../../package.json) ·
[Pre-commit hook](../../.husky/pre-commit)

## Decision

### 1. Maintain player instructions at their generation source

Keep the player introduction in `gps.readme-prefix` and regenerate the README
when it changes. The Table of contents continues to derive its entries from game
pages.

### 2. Give engineering documentation one owner per subject

Use the [responsibility table in AGENTS.md](../../AGENTS.md) to place rules,
terminology, architecture, decisions and plans. Use the
[documentation index](../README.md) to find them. A document that needs a rule
or decision owned elsewhere links to its source.

### 3. Register a single directory of agent skills

Keep repository skills in `.agents/skills/`. The Claude and CatPaw registration
directories use relative symlinks to that directory so an edit or installation
through either path reaches the same files.

## Applicability

This decision covers the text and agent skills maintained in this repository.
Game mechanics, menu order and GitHub Pages hosting are outside its scope.

## Alternatives & Trade-offs

| Dimension            | Separate the player README and engineering documentation (recommended)                                      | Keep engineering documentation in the README                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Approach             | Generate the player introduction and game links. Maintain engineering Markdown files alongside the project. | Put engineering prose in the generator configuration so it survives each rebuild.                 |
| Cost and constraints | Contributors use the documentation index to find the owner of a topic.                                      | Multiline engineering text lives in a JSON string and reaches every player reading the game list. |
| Verdict              | Adopted. Each audience has a direct entry point and each change has an editable source.                     | Rejected. A single entry point makes rule updates harder to review and games harder to find.      |

## Long-term Consequences

A change to player instructions includes the generator input and its regenerated
output. When an engineering document moves, its index entry and incoming links
move with it. Tools that register skills must preserve relative symlinks in a
checkout.
