---
description: Read this file before implementing server actions, data validation, and database mutations in the project.
---

# Server Actions and Data Validation

Use server actions for all data mutations in this app.

## Rules

- All modifications to data must happen inside **server actions**.
- Server actions must be called from **client components** only.
- Server action files must be named `actions.ts` and colocated in the same directory as the component that calls them.
- All data passed to server actions must use explicit TypeScript types. Do not use the generic `FormData` type.
- Validate all server action input using **zod**.
- Every server action must first verify a logged-in user before performing database operations.
- Server actions must not use Drizzle queries directly. Use helper functions in the `/data` directory for all database access.
- Server actions should not throw errors. Return an object with either an `error` or `success` property instead.

## Example pattern

- `components/some-component/actions.ts`
- `components/some-component/SomeComponent.tsx`

The component calls the action from the client side, while the server action validates input, checks auth, and delegates persistence to `/data` helpers.
