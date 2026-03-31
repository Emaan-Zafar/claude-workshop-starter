# Contributing to claude-workshop-starter

## Branch naming (workshop convention)

Use this pattern so branches match ticket-style workflows and work well with Claude Code prompts:

```
<type>/<short-id>-<short-description>
```

| Part | Examples |
|------|----------|
| `type` | `feat`, `fix`, `chore`, `docs`, `test` |
| `short-id` | GitHub issue number (`42`) or ticket-style id (`BRIGHT-1234`) |
| `short-description` | kebab-case, 3–5 words max |

Examples:

- `fix/42-divide-by-zero-math-api`
- `feat/15-health-check-endpoint`
- `chore/3-update-readme-links`

**Never** push directly to `main` for workshop exercises — always use a branch and a pull request.

## Pull requests

- Link the GitHub issue in the PR description (`Closes #42`).
- Run `npm test` before opening the PR.
- Keep changes scoped to one issue when possible.
