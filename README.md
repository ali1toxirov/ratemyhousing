# RateMyHousing · Temple University

A "Rate My Professor" for housing. Temple students (and future students) can browse on- and off-campus
housing, read and write reviews, compare prices, and learn how housing at Temple works.

Built for OwlHacks.

## What's on the site

| Page | Address | What it does |
| --- | --- | --- |
| Home | `/` | Big search bar, top-rated places, latest reviews, links to everything else |
| Browse Housing | `/housing` | Every dorm and apartment as a card, with search, filters, and sorting |
| Housing detail | `/housing/morgan-hall` (etc.) | Info, price, amenities, rating breakdown, and all reviews for one place |
| Reviews | `/reviews` | Feed of every review, with filters and a "Write a review" button |
| Pricing | `/pricing` | Price comparison table, budget calculator, hidden costs, money tips |
| Housing Guide | `/guide` | Timeline, on vs. off campus pros and cons, packing checklist, FAQ |

## How to run it on your laptop

You only do steps 1–3 once.

1. Install **Node.js** (the "LTS" version) from <https://nodejs.org>. It lets your computer run JavaScript
   outside a browser.
2. Install **VS Code** (or Cursor) as your code editor.
3. Download this project (clone it with git), open the folder in your editor, open the built-in terminal, and run:

   ```bash
   npm install
   ```

   This downloads all the libraries the project uses into a `node_modules` folder. It takes a minute.

4. Start the website:

   ```bash
   npm run dev
   ```

5. Open <http://localhost:4317> in your browser. Leave the terminal running. Every time you save a file,
   the page updates automatically. Press `Ctrl + C` in the terminal to stop it.

## The tools we used (in plain English)

- **Next.js** is the framework. Every folder inside `src/app` becomes a page on the site.
- **React** lets us build the page out of reusable pieces called *components* (like a `ReviewCard`).
- **TypeScript** is JavaScript with labels on data, so the editor warns you when you make a typo.
- **Tailwind CSS** handles styling. Instead of writing a separate CSS file, you put short class names
  like `text-lg font-bold` directly on elements.
- **shadcn/ui** provides pre-made, good-looking buttons, dialogs, dropdowns, and tables (in `src/components/ui`).

## Where things live

```
src/
  app/                  ← every folder here is a page
    page.tsx            ← Home page
    layout.tsx          ← the frame around every page (header + footer)
    globals.css         ← colors and fonts (Temple cherry lives here)
    housing/            ← Browse page + housing/[slug] detail pages
    reviews/            ← Reviews page
    pricing/            ← Pricing page + budget calculator
    guide/              ← Housing guide page
  components/           ← reusable pieces (cards, stars, header, review form)
    ui/                 ← shadcn building blocks, don't edit these much
  data/
    housing.ts          ← the list of dorms/apartments (edit this to add places!)
    reviews.ts          ← starter reviews
  lib/
    reviews-store.ts    ← saves new reviews in the browser
    ratings.ts          ← math for averages and star breakdowns
```

## Important notes

- **There's no database yet.** New reviews are saved in your browser (`localStorage`), so they stay
  when you refresh, but other people won't see them. That's fine for a hackathon demo. Adding a real
  database (for example Supabase or Firebase) is a good stretch goal.
- **Prices are estimates** for demo purposes. Double-check real numbers on Temple's housing website before presenting.

See [`TEAM_PLAN.md`](./TEAM_PLAN.md) for how the two of us split the work.
