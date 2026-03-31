# Claude Workshop Starter

A mini enterprise project for practicing Claude Code's agentic capabilities.

## Project Structure

```
claude-workshop-starter/
├── src/                    Modern application code
│   ├── server.js           Express HTTP server (entry point)
│   ├── routes/             Route handlers by domain
│   │   ├── math.js         /add, /subtract, /multiply, /divide
│   │   ├── payments.js     /calculate-total, /apply-discount
│   │   └── users.js        /register, /list (stub for future sessions)
│   ├── services/           Business logic (pure functions)
│   │   ├── math-utils.js   Arithmetic operations
│   │   ├── payment-service.js  Totals, tax, discounts (has bugs)
│   │   └── user-service.js In-memory user store
│   └── middleware/
│       └── validate-input.js  (empty — you will build this with Claude)
│
├── legacy/                 Simulated legacy code — DO NOT copy patterns
│   ├── README.md           Warning: this code has anti-patterns
│   ├── payment-calc.js     Old payment logic (var, callbacks, bugs)
│   ├── tax-rules.js        Hardcoded tax rates, spaghetti logic
│   └── billing-helper.js   Uses eval() and SQL string concatenation
│
├── tests/                  Test files
│   ├── run-all.js          Simple test runner
│   ├── math.test.js        Passing tests for add/subtract
│   └── payments.test.js    One basic test — deliberately incomplete
│
├── docs/                   (empty — homework: generate docs with Claude)
├── CONTRIBUTING.md         Branch naming + PR expectations (Session 4)
├── .github/
│   └── pull_request_template.md   PR description scaffold (Session 4)
└── CLAUDE.md               (minimal — Session 3 builds this live)
```

## Getting Started

```bash
npm start          # Start the server on http://localhost:3000
npm test           # Run the test suite
```

## Purpose

This project is designed for the Claude Code workshop. It contains:

1. **A working Express API** with multiple route files and service layers
2. **A legacy/ folder** with deliberately bad code patterns (for Plan mode analysis)
3. **Deliberate bugs** in payment calculations (for hands-on debugging)
4. **Incomplete tests** (for Claude to generate)
5. **An empty CLAUDE.md** (for participants to build during the session)

Each of these is used in a specific workshop module. Do not fix the bugs manually — the point is to use Claude Code to find and fix them.
