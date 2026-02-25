# Events Site

Vite + React prototype for a brand events page with a built-in CMS admin panel. Built in Cowork, continuing in Claude Code.

## What this is

A single-page React app (`src/App.jsx`) with two views toggled via an ADMIN button in the nav:

- **Events Page** — consumer-facing: hero card, series banners, filter bar, event card grid
- **Admin CMS** — full CRUD for events and series, form modals, delete confirmation

No routing library, no CSS framework, no external UI deps — just React + inline styles.

## Data model

```
Event
  id, title, description
  categoryId       → one of: bus-tour | pop-up | launch | workshop
  seriesId         → optional FK to a Series
  venue, city, state
  startDate, endDate  (ISO strings)
  rsvpUrl, rsvpLabel
  products[]       (string array)
  featured         (boolean — controls hero display)

Series
  id, name, subtitle, description
  startDate, endDate
  color, gradient

Category  (hardcoded config, not CMS-managed)
  id, name, emoji, color, gradient, badge styles
```

## Status logic

Event status is computed from a `NOW` constant in `App.jsx` (line ~8). Currently hardcoded to `2026-02-25T14:00:00` to demo the LA stop as live. **Change this to `new Date()` before any real launch.**

States: `live` → `today` → `upcoming` → `past`

## Immediate next steps

1. `npm install`
2. `npm run dev` — verify it runs clean at localhost:5173
3. `git init && git add . && git commit -m "initial: events prototype"`
4. Create GitHub repo and push (`gh repo create events-site --public --push --source=.`)
5. `npm i -g vercel && vercel --prod`

## Planned work

- [ ] Swap hardcoded `NOW` → `new Date()`
- [ ] Add real brand name / logo
- [ ] Hook up real RSVP links
- [ ] Consider persisting CMS state (localStorage or a backend)
- [ ] Mobile responsiveness pass
- [ ] Add map embed or directions link per event
