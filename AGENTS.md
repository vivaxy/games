# Games engineering norms

## Documentation responsibilities

| Home                                         | Put here                                                      | Route related material to                                         |
| -------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| [README.md](README.md)                       | Player instructions and the generated Table of contents       | Engineering rules belong in `AGENTS.md`.                          |
| `AGENTS.md`                                  | Rules that apply across the repository                        | The rationale for a long-term choice belongs in an ADR.           |
| [docs/README.md](docs/README.md)             | Links to documentation and the purpose of each directory      | Put the content in the linked document.                           |
| [docs/glossary.md](docs/glossary.md)         | Canonical terms and definitions                               | Component relationships belong in the architecture document.      |
| [docs/architecture.md](docs/architecture.md) | Current components, dependencies and flows                    | Record why a boundary was chosen in an ADR.                       |
| [docs/adr/](docs/adr/)                       | Dated architecture decision records (ADRs)                    | Put the delivery steps for a particular change in its plan.       |
| [docs/plans/](docs/plans/)                   | One dated file per change, including its verification results | Record a long-term design choice in an ADR.                       |
| `docs/guides/`                               | Recurring procedures for people, added with the first guide   | Put a procedure run by an agent in a skill.                       |
| [.agents/skills/](.agents/skills/)           | Procedures an agent executes                                  | Link to an existing human guide when both audiences share a step. |

Name each ADR and plan `YYYY-MM-DD-<topic>.md` using its first-written date.
Keep each document with the layer that owns its main purpose. The
[documentation boundaries ADR](docs/adr/2026-11-25-documentation-boundaries.md)
records the decision.

## Project structure

```text
.
├── index.html, menu.json          Games home page and menu
├── <game>/                       One game page with its scripts, styles and assets
├── calculator-the-game-solver/   Calculator The Game Solver and its saved answers
├── .github/                      GitHub funding configuration
├── .husky/                       Git hooks for generated files and formatting
├── docs/                         Documentation index, glossary and architecture
│   ├── adr/                      Decision records and their template
│   └── plans/                    Change plans and their results
├── .agents/skills/               Source of repository skills
├── .claude/skills                Claude skill registration
└── .catpaw/skills                CatPaw skill registration
```

## Agent skills

- Keep each repository skill in `.agents/skills/<skill-name>/` with a `SKILL.md`
  entry point. Both registration paths are relative symlinks to
  `../.agents/skills`.
- Keep a skill's references and behavior evaluations with the skill. Cover its
  main workflow and a constraint it promises to uphold.

## Development flow

1. Start from the requested outcome. Check the assumptions behind the next step
   against source or other primary evidence. Ask when a remaining uncertainty
   changes scope, correctness or acceptance.
2. For a change to an interface, data meaning or long-term constraint, update
   the relevant design, ADR or plan first. State the intended behavior and how
   it will be verified.
3. Implement the smallest change that meets those requirements. Reuse existing
   code and explain a simpler alternative when it achieves the same outcome.
   Correct the design if the implementation reveals a wrong assumption.
4. Add or update tests for the changed behavior, then run the owning package's
   checks. Copy edits, asset-only adjustments and mechanical one-line changes
   can go directly to verification when they preserve the contract.

## Code conventions

- Use the HTML, CSS and JavaScript conventions of the game page being edited.
  Its entry point determines how its scripts load. The root tooling uses npm
  8.19.4.
- Follow [.editorconfig](.editorconfig) and [.prettierrc](.prettierrc) for
  formatting, including two-space indentation, LF line endings and single quotes
  in JavaScript.
- Determine interface semantics and valid values from the owning source, type or
  specification. Use tests and runtime observations to verify behavior.

## Notes

- For code or architecture work, read the [glossary](docs/glossary.md),
  [architecture](docs/architecture.md), relevant [ADRs](docs/adr/) and
  [plans](docs/plans/), then the owning source.
- Use the glossary's first spelling in code identifiers, documentation, ADRs,
  commit messages, PR descriptions and replies. Define a new shared term before
  using it and respect the `Avoid` column.
- When evidence conflicts with a premise, verify the discrepancy and ask for a
  decision if it affects the work. Lead with whether the claim holds, partly
  holds or fails. In Chinese, use 成立、部分成立 or 不成立. Distinguish
  observations, inferences and open questions.
- Keep reports concise. Give the result, evidence, validation and any
  outstanding work with its cause. Use parallel categories that cover the
  requested scope once.
- Use English Conventional Commits for one logical change at a time, following
  the repository's scope style, for example `feat(seo): add sitemap`.
