---
description: Read this file before creating or modifying UI components in the project.
---

# UI Components — shadcn/ui

All UI elements in this project must use **shadcn/ui** components. Do not create custom UI components from scratch.

## Rules

- **Always** use an existing shadcn/ui component before considering any alternative.
- **Never** build custom buttons, inputs, dialogs, dropdowns, cards, or other common UI primitives — use the shadcn/ui equivalent.
- Add new shadcn/ui components via the CLI: `npx shadcn@latest add <component>`. Never create or edit files inside `components/ui/` by hand.
- Style adjustments must be made through Tailwind utility classes passed via `className` props, not by modifying the component source.
- If a shadcn/ui component does not exist for the required use case, compose one from existing shadcn/ui primitives before reaching for a third-party library.

## Adding Components

```bash
npx shadcn@latest add <component-name>
```

Components are installed into `components/ui/` and are ready to import via `@/components/ui/<component-name>`.
