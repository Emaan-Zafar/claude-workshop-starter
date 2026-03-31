# Claude Workshop Starter — Project Rules
# (This file will be built out during the Session 3 workshop)

# Tech stack: Node.js, Express
# Test runner: node tests/run-all.js

# Coding Standards
# ALWAYS use const for variables that are not reassigned; use let only when reassignment is needed; NEVER use var
# ALWAYS add JSDoc comments (/** */) to exported functions
# NEVER use eval() or Function() constructor
# NEVER build SQL strings with concatenation — use parameterized queries

# Architecture
# Architecture: server.js → routes/ → services/ → (middleware if needed)
# Route files handle HTTP only — no business logic in routes
# Service files are pure functions — no req/res objects
# The middleware/ folder is for reusable Express middleware
# NEVER import from legacy/ in any file inside src/

# Error Handling & Patterns
# NEVER use callback-style functions — use async/await or Promises
# NEVER use arguments object — use explicit parameters or rest syntax
# NEVER skip input validation in route handlers
# NEVER return raw errors to the client — use structured { error: "message" } responses
