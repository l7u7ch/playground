# Directory Structure

- [src/app/](../src/app/) — Next.js App Router pages, layouts, and server actions
  - [layout.tsx](../src/app/layout.tsx) — Root layout: sets lang, dark class, metadata, imports globals.css
  - [page.tsx](../src/app/page.tsx) — Home page (Server Component): fetches todos from Supabase and renders TodoList
  - [actions.ts](../src/app/actions.ts) — Server Actions: `addTodo`, `toggleTodo`, `deleteTodo` with path revalidation
  - [globals.css](../src/app/globals.css) — Global styles: imports Tailwind CSS and HeroUI styles

- [src/components/](../src/components/) — Reusable UI components
  - [todo-list.tsx](../src/components/todo-list.tsx) — Client component: manages todo list with `useOptimistic` for instant UI updates
  - [todo-item.tsx](../src/components/todo-item.tsx) — Displays a single todo with HeroUI Card, Checkbox, and delete Button
  - [add-todo-form.tsx](../src/components/add-todo-form.tsx) — Client form with HeroUI Input and Button for adding new todos

- [src/lib/](../src/lib/) — Shared utilities and client factories
  - [supabase-server.ts](../src/lib/supabase-server.ts) — Server-side Supabase client using `@supabase/ssr` with cookie sessions
  - [supabase-client.ts](../src/lib/supabase-client.ts) — Browser-side Supabase client for use in Client Components

- [src/types/](../src/types/) — TypeScript type definitions
  - [todo.ts](../src/types/todo.ts) — `Todo` type: `{ id, text, is_done, created_at }`
