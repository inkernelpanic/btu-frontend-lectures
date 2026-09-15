# BTU Frontend Lectures

Lecture materials for **BIT-11.2022 — Web Programming (Front End Development)** at BTU. Sixteen lectures plus Git topics and keyboard-shortcut references, published at <https://btu-frontend-lectures.netlify.app>.

The syllabus this content follows is tracked at `src/assets/BIT-11.2022_ვებ პროგრამირება (Front End Development).pdf`.

## Getting started

```bash
npm install
npm run dev      # vite dev server
```

| Script           | What it does                                     |
| ---------------- | ------------------------------------------------ |
| `npm run dev`    | Dev server with hot reload                       |
| `npm run build`  | `tsc -b && vite build` — run this before pushing |
| `npm run lint`   | ESLint over the whole repo                       |
| `npm run format` | Prettier over `src/`                             |

> **Note on `npm run format`:** it rewrites every file under `src/`, which produces a large unrelated diff if the repo was not already formatted. Prefer `npx prettier --write <the files you touched>`.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · react-router-dom 7 · Prism (syntax highlighting). No CMS, no backend — every lecture is a React component.

## How a lecture is wired up

Adding a lecture takes two steps; there is no registry to edit.

**1. Add an entry to [`src/data/lectures.ts`](src/data/lectures.ts).** Array order is authoritative — it drives the sidebar order, the prev/next links, and the home page.

```ts
{
  id: "17",                       // zero-padded string
  title: "My New Lecture",
  description: "One line, shown on the home page and under the lecture title",
  section: "JavaScript",          // must be one of the union values in this file
}
```

**2. Create `src/lectures/lecture-17/index.tsx`.** [`LecturePage.tsx`](src/components/LecturePage.tsx) discovers it automatically via `import.meta.glob("../lectures/lecture-*/index.tsx")` and lazy-loads it, so each lecture ships as its own chunk. The folder number must match the `id`.

```tsx
const Lecture17 = () => (
  <LectureWrapper id="17" title="My New Lecture">
    <section>
      <h2>First topic</h2>
      ...
    </section>
  </LectureWrapper>
);
export default Lecture17;
```

The `id` prop must match the data entry or prev/next silently breaks. The `title` prop should match too — it is what renders as the page `<h1>` and the browser tab title.

Introducing a **new section** means adding the string to the union in `src/data/lectures.ts` _and_ to the `sections` array in [`Sidebar.tsx`](src/components/Sidebar.tsx) — a lecture whose section is not in that array silently disappears from the nav.

Git topics work the same way: [`src/data/git.ts`](src/data/git.ts) + `src/git/<slug>/index.tsx`. Shortcut pages are pure data in [`src/data/shortcuts.ts`](src/data/shortcuts.ts) — no component.

## Writing lecture content

Compose from the shared components in [`src/components/`](src/components/) rather than hand-rolling markup:

| Component                                                                            | Use it for                                                                                                                   |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `CodeBlock`                                                                          | Static, syntax-highlighted code. Props: `code`, `language` (`html`/`css`/`javascript`/`bash`), `title`                       |
| `AnnotatedCode`                                                                      | Code broken into `segments`, each with an optional `annotation` + `label`. The workhorse for explaining syntax line by line  |
| `JsConsole`                                                                          | Runnable JS with captured `console.log` output. Handles async output (`setTimeout`, promises) correctly                      |
| `InteractivePlayground`                                                              | **Editable** code + live iframe preview. `language="html"` runs full HTML + `<script>`; use it for anything touching the DOM |
| `LivePreview`                                                                        | Read-only code + rendered result, side by side                                                                               |
| `Diagram`                                                                            | A titled box for custom JSX illustrations                                                                                    |
| `InfoBox`                                                                            | Callout. `type`: `info` \| `warning` \| `tip`                                                                                |
| `ExerciseBlock` / `HomeworkBlock`                                                    | Numbered exercises and the end-of-lecture assignment                                                                         |
| `FlexboxPlayground`, `GridPlayground`, `BoxModelDemo`, `DisplayDemo`, `PositionDemo` | Purpose-built interactive CSS demos                                                                                          |

Conventions used throughout:

- One `<section>` per `<h2>`; `<h3>` for subsections.
- Prose is English even though the course is taught in Georgian.
- `--` is used instead of an em dash in lecture body text.
- Anything a student might copy should be correct as written — including `alt` text, `name` attributes on form fields, and `res.ok` checks on `fetch`.

## Deployment

Netlify, building `npm run build` into `dist/`. [`public/_redirects`](public/_redirects) contains the SPA fallback (`/* /index.html 200`) — without it every deep link 404s on refresh.

## Before opening a PR

```bash
npm run build && npm run lint
```

Both must pass. There is no CI yet, so this is on you.
