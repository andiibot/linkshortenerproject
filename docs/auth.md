# Authentication — Clerk

All authentication in this project is handled exclusively by **Clerk**.
No other auth libraries, custom session handling, or alternative sign-in methods should ever be used.

## Rules

- `ClerkProvider` wraps the entire app in `app/layout.tsx` — do not add a second provider or remove the existing one.
- Use Clerk's built-in components (`SignInButton`, `SignUpButton`, `UserButton`, `Show`) for any auth UI.
- **Sign in and sign up must always launch as a modal** — pass `mode="modal"` to `<SignInButton>` and `<SignUpButton>`. Never redirect to a dedicated `/sign-in` or `/sign-up` page.
- Never implement custom login forms, JWT handling, or session management outside of Clerk.
- Never store auth state in React context, Zustand, or any other client-side store — always derive it from Clerk hooks/helpers.

## Sign In / Sign Up UI

```tsx
<SignInButton mode="modal">...</SignInButton>
<SignUpButton mode="modal">...</SignUpButton>
```

## Protected Routes

- `/dashboard` is a **protected route**. Users must be signed in to access it.
- Route protection is enforced in `middleware.ts` using `clerkMiddleware` and `createRouteMatcher`.

### middleware.ts pattern

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])
const isPublicHome = createRouteMatcher(["/"])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // Redirect signed-in users away from the homepage to /dashboard
  if (userId && isPublicHome(req)) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Protect /dashboard — redirect unauthenticated users to sign-in
  if (!userId && isProtectedRoute(req)) {
    return auth.protect() as unknown as NextResponse
  }
})

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
}
```

## Accessing Auth State

- **Server Components / Route Handlers**: use `auth()` from `@clerk/nextjs/server`.
- **Client Components**: use `useAuth()` or `useUser()` from `@clerk/nextjs`.
- Never pass auth tokens manually between components — always call Clerk helpers directly where needed.
