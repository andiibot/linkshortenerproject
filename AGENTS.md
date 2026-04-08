# LinkShortener — Agent Instructions

This file is the entry point for LLM coding agents working in this repository.
Read all referenced docs before making changes. Instructions are split by domain
to keep each file focused and easy to maintain.

> [!CAUTION]
> **BLOCKING REQUIREMENT — NO EXCEPTIONS**
> You **MUST** read every relevant file in the `/docs` directory **before** writing a single line of code.
> Generating code without first reading the applicable docs is a critical violation of these instructions.
> This applies to every task, no matter how small. Do not skip, skim, or defer this step.

## Documentation Index

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory.

**STOP. Before writing any code:**
1. Identify which docs apply to your task using the table below.
2. Use `read_file` (or equivalent) to fully load each relevant doc.
3. Only then begin generating or modifying code.

Failure to follow this order will produce incorrect, inconsistent, or policy-violating output.

| Topic | File |
|-------|------|
| Authentication (Clerk) | [`docs/auth.md`](./docs/auth.md) |
| UI Components (shadcn/ui) | [`docs/ui.md`](./docs/ui.md) |

| Topic | File |
|-------|------|
| Authentication (Clerk) | [`docs/auth.md`](./docs/auth.md) |
| UI Components (shadcn/ui) | [`docs/ui.md`](./docs/ui.md) |

## Non-Negotiable Rules

- **Never** install packages not already in `package.json` without explicit user approval.
- **Never** edit files inside `components/ui/` by hand — those are managed by the shadcn CLI.
- **Always** run `prettier --write` formatting rules mentally: no semicolons, double quotes, 2-space indent, LF line endings.
- **Always** use the `@/` path alias for project-internal imports.
- **Always** keep Server Components as the default; only add `"use client"` when browser APIs or React hooks are required.
- **Never** commit secrets or hardcode environment variables — use `.env` and `process.env`.
