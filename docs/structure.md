# Directory Structure

- `src/app/` — Next.js App Router pages, layouts, and server actions
  - `layout.tsx` — Root layout: sets lang, dark class, metadata, imports globals.css
  - `page.tsx` — Home page (Server Component): fetches todos from Supabase and renders TodoList
  - `actions.ts` — Server Actions: `addTodo`, `toggleTodo`, `deleteTodo` with path revalidation
  - `globals.css` — Global styles: imports Tailwind CSS and HeroUI styles

- `src/components/` — Reusable UI components
  - `todo-list.tsx` — Client component: manages todo list with `useOptimistic` for instant UI updates
  - `todo-item.tsx` — Displays a single todo with HeroUI Card, Checkbox, and delete Button
  - `add-todo-form.tsx` — Client form with HeroUI Input and Button for adding new todos

- `src/lib/` — Shared utilities and client factories
  - `supabase-server.ts` — Server-side Supabase client using `@supabase/ssr` with cookie sessions
  - `supabase-client.ts` — Browser-side Supabase client for use in Client Components

- `src/types/` — TypeScript type definitions
  - `todo.ts` — `Todo` type: `{ id, text, is_done, created_at }`
