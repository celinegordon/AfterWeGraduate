# Our People

> Working title. May be renamed **AfterWeGraduate**.

**New city. New chapter. Your people.**

Our People is a free, mobile-friendly website that helps Black graduates find community after college. Type in the city you're moving to and get a curated directory of Black social groups, book clubs, wellness crews, and professional networks, each linking straight to the group's website or Instagram.

Built by Celine Gordon for Senior Design (Dr. Moretti).

## Why

At Spelman, community is built in. After graduation that disappears overnight, and many of the Black clubs and groups worth joining live only on Instagram or by word of mouth. Meetup helps you find people in a new city; Our People helps you find *your* people.

## What works right now

This first commit is the front-end prototype, built in Figma Make:

- **Home page:** headline, city search box, quick-pick cities (Atlanta, New York, Washington DC), "How it works" steps, and an "Our why" section
- **City search:** enter any city (suggestions for Atlanta, New York, Washington DC, Chicago, Houston, Los Angeles) to open the results page
- **Results page:** 10 real organizations shown as cards, filterable by category (Social & gatherings, Outdoors & wellness, Books & culture, Career & connection, Service & community)
- **Detail pop-up:** full description, a "Your first step" tip, and links to the group's website and Instagram
- **My saved:** heart any organization to save it; the list is stored in your browser (`localStorage`) and never sent anywhere
- **Responsive layout:** works on desktop, tablet, and phone

Organization data currently lives in `src/App.tsx`. It moves into the database in the next milestone.

## Tech stack

| Layer | Now | Planned |
| --- | --- | --- |
| Frontend | React 19, Vite 8, Tailwind CSS v4, TypeScript | Same |
| Backend | None | Node.js + Express JSON API |
| Database | None (data hard-coded) | Supabase (PostgreSQL) |
| Hosting | Figma Make preview | Vercel (frontend), Render (API) |

## Getting started

Requirements: Node.js 20.19+ or 22.12+ and pnpm (versions are pinned in `.mise.toml`).

```bash
pnpm install
pnpm dev
```

Then open the URL Vite prints (default port 8443, or `$PORT` if set).

Other scripts:

| Command | What it does |
| --- | --- |
| `pnpm build` | Production build into `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm format` | Format code with oxfmt |

## Project structure

```
index.html        Vite HTML shell with the #root element
src/main.tsx      React entry point; loads index.css and mounts App
src/App.tsx       All pages, components, and the organization data
src/index.css     Global styles, fonts, and the Tailwind import
vite.config.ts    Vite config (React, Tailwind, Figma Make plugins, @ alias)
package.json      Dependencies and scripts
```

## Planned API

| Feature | Request | Description |
| --- | --- | --- |
| Search by city + filter | `GET /api/organizations?city=washington-dc&category=books` | Approved organizations active in a city, optionally filtered by category |
| City list | `GET /api/cities` | Cities for the search suggestions |
| Organization detail | `GET /api/organizations/:id` | One organization with its category, tags, and cities |
| Suggest a group | `POST /api/suggestions` | Saves a suggested group as `pending` for review |

## Planned database tables

| Table | Main columns |
| --- | --- |
| `cities` | id, name, state, slug |
| `categories` | id, name |
| `organizations` | id, name, tagline, description, url, instagram_url, tags, women_centered, is_verified, category_id |
| `organization_cities` | organization_id, city_id |
| `suggestions` | id, group_name, city, link, submitter_email (optional), status, created_at |

## Milestones

- [x] **Prototype:** front end with 10 hard-coded organizations, filters, detail pop-up, and saved list
- [ ] **Skeleton:** React calls `GET /api/organizations` on a deployed Express API reading seeded Supabase rows
- [ ] **Draft:** city search, category filter, and detail view served from the API; about 15 organizations across 6 cities
- [ ] **Final:** Suggest a group form with validation; about 25 organizations; deployed on Vercel and Render

## Privacy

There are no accounts and no login. The saved list stays in your own browser. The only personal data the planned version collects is an optional email on a group suggestion, used only to follow up and deleted once the suggestion is reviewed.

## Data note

Our People is a curated starting point, not a live events directory. Organizations are gathered by hand from their public websites and Instagram pages. Always confirm schedules, fees, and local availability with the group directly.
