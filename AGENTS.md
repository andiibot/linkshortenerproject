# LinkShortener — Agent Instructions

This file is the entry point for LLM coding agents working in this repository.
Read all referenced docs before making changes. Instructions are split by domain
to keep each file focused and easy to maintain.

> [!CAUTION]
> **BLOCKING REQUIREMENT — NO EXCEPTIONS**
> Generating code without first reading the applicable docs is a critical violation of these instructions.
> This applies to every task, no matter how small. Do not skip, skim, or defer this step.
## Non-Negotiable Rules
- **Never** install packages not already in `package.json` without explicit user approval.
- **Never** edit files inside `components/ui/` by hand — those are managed by the shadcn CLI.
- **Always** run `prettier --write` formatting rules mentally: no semicolons, double quotes, 2-space indent, LF line endings.
- **Always** use the `@/` path alias for project-internal imports.
- **Always** keep Server Components as the default; only add `"use client"` when browser APIs or React hooks are required.
- **Never** commit secrets or hardcode environment variables — use `.env` and `process.env`.
