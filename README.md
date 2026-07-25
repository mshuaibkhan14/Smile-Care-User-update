# SmileCare Dental Clinic — MERN Course Project

A multi-page dental clinic website built with React 19, Ant Design, React Router v7,
and Redux Toolkit (RTK Query). Fully static/frontend-only — no backend server to
run or deploy. Services, dentists, and testimonials are hardcoded data; user
accounts and appointments are stored in the browser via `localStorage`.

## Tech Stack

- **React 19** — function components + Hooks only (class component used once,
  intentionally, for the root Error Boundary)
- **Ant Design 6** — UI components, themed via a single `ConfigProvider` config
- **React Router DOM v7** — `createBrowserRouter`, nested layouts, lazy-loaded routes
- **Redux Toolkit + RTK Query** — data fetching, caching, mutations, backed by
  `fakeBaseQuery` (no HTTP calls — reads hardcoded data / localStorage instead)
- **Vite** — build tool

## Getting Started

```bash
npm install
npm run dev
```

That's it — one command, no separate API process to start.

To build for production:

```bash
npm run build
npm run preview
```

## One-File Theming

All colors and fonts live in **`src/theme/themeConfig.js`**. Change the `brand`
object there (and mirror the values in `src/theme/theme.css`) and the entire
site — every Ant Design button, card, form, menu — updates automatically via
`ConfigProvider`. A light/dark shade toggle (top right of the navbar) is wired
through `src/theme/ThemeContext.jsx` using Context API, proving the same theme
object drives both modes.

## Project Structure

```
src/
  theme/        theme tokens (JS + CSS), ThemeContext (dark/light toggle)
  store/        Redux store, RTK Query apiSlice (fakeBaseQuery, no network calls)
  data/         hardcoded services/dentists/testimonials + localStorage store
                for users/appointments (localStore.js)
  router/       route config, ErrorBoundary (class), RouteError (functional),
                RequireAuth (login guard)
  layouts/      MainLayout, Navbar, Footer
  pages/        Home, Services, ServiceDetail, About, Contact, BookAppointment,
                Profile, Payment, NotFound
  components/   Hero, ServiceCard, WhyChooseUs, CtaBanner, AuthModal, etc.
  hooks/        useDebounce, useScrollPosition (custom hooks)
```

## Data & Persistence

- **Services, dentists, testimonials** — hardcoded in `src/data/*.js`. Edit
  those files directly to change clinic info, doctors, or reviews.
- **Users & appointments** — created at runtime (signup, booking) and saved to
  `localStorage` via `src/data/localStore.js`. This means:
  - Data persists across refreshes, but only in that one browser.
  - Clearing site data / using a different browser or device starts fresh.
  - There's no real backend, so this isn't multi-device or multi-user —
    it's a working demo, not production data storage.

## Swapping in a Real Backend Later

Everything RTK Query-related is isolated in `src/store/apiSlice.js` — every
component uses the generated hooks (`useGetServicesQuery`, `useCreateAppointmentMutation`,
etc.) the same way regardless of where the data actually comes from. To wire up
a real backend later, replace the `queryFn` functions in `apiSlice.js` with real
`query`/`fetchBaseQuery` calls against your API — no changes needed anywhere else.

## Deploying

Since this is fully static now (no backend to host), it deploys anywhere that
serves a Vite build: Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.
`vercel.json` and `netlify.toml` are already included with the SPA rewrite rule
those platforms need for client-side routing (`react-router-dom`'s
`createBrowserRouter`) to work on a direct link or page refresh.

```bash
npm run build   # outputs to dist/
```

Deploy the `dist/` folder (or connect the repo and let the platform run
`npm run build` for you) — that's the whole deploy, no environment variables,
no second host for an API.

## Notes

- Service images currently pull from Unsplash — swap for your own clinic photos
  before showing this to a real client or recruiter.
- Auth is a demo mock: passwords are stored in plaintext in localStorage. Fine
  for a portfolio piece, not something to reuse against real user data.
