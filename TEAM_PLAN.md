# Team plan: who does what

The golden rule: **two people should never edit the same file at the same time.** If you do,
git creates a "merge conflict" and someone has to untangle it by hand. So each person *owns*
certain files. You can read anything, but you only edit your own files.

## Partner A: "Reviews & Housing" (the interactive stuff)

You own everything about browsing places and writing and reading reviews.

| Files you own | What they are |
| --- | --- |
| `src/app/housing/` (whole folder) | Browse page and each housing detail page |
| `src/app/reviews/` (whole folder) | Reviews feed page |
| `src/components/review-form.tsx` | The "Write a review" pop-up |
| `src/components/review-card.tsx` | How a single review looks |
| `src/components/housing-card.tsx` | How a single place looks in the grid |
| `src/components/stars.tsx`, `rating-badge.tsx` | Star icons and the colored score box |
| `src/data/reviews.ts` | Starter reviews |
| `src/lib/reviews-store.ts`, `src/lib/ratings.ts` | Saving reviews + rating math |

**Ideas to build next (pick 1–2):**
1. Add a "Compare" feature: check two places and see them side by side.
2. Add tags on reviews (e.g. "Quiet", "Party dorm", "Good AC") that people can pick in the form.
3. Add a "Report review" button.
4. Stretch: connect a real database (Supabase) so reviews are shared between everyone.

## Partner B: "Info & Design" (the content stuff)

You own the pages that teach people about housing, plus the look of the site.

| Files you own | What they are |
| --- | --- |
| `src/app/page.tsx` + `src/components/home/` | Home page |
| `src/app/pricing/` (whole folder) | Pricing page + budget calculator |
| `src/app/guide/` (whole folder) | Housing guide page |
| `src/data/housing.ts` | The list of dorms and apartments, prices, and descriptions |
| `src/components/site-footer.tsx`, `page-header.tsx` | Footer and page title banners |

**Ideas to build next (pick 1–2):**
1. Fact-check prices and descriptions against Temple's housing site, and add missing places.
2. Add real photos of each building (put images in `public/` and show them in the cover).
3. Add a map page (Google Maps or Leaflet) with a pin for each place.
4. Add a "Roommate tips" or "Neighborhood safety" section to the guide.

## Shared files: talk before you touch

`src/app/layout.tsx`, `src/components/site-header.tsx`, `src/components/logo.tsx`, `src/app/globals.css`, and `package.json`.
Before editing one of these, text your partner "I'm editing the header", make the change, push it, and
tell them when you're done.

## How to use git without breaking each other's work

Think of git like Google Docs version history, except you choose when to save ("commit") and when
to upload ("push").

1. **Start of each work session:** get your partner's latest work.
   ```bash
   git checkout main
   git pull
   ```
2. **Make your own branch** (a private copy to work in):
   ```bash
   git checkout -b partner-a/compare-feature
   ```
3. **Save often** while you work:
   ```bash
   git add .
   git commit -m "Add compare button to housing cards"
   ```
4. **Upload** your branch:
   ```bash
   git push -u origin partner-a/compare-feature
   ```
5. On the repo website, open a **Pull Request** and have your partner glance at it, then merge it into `main`.
6. Go back to step 1.

Merge small pieces often (every hour or two). Big merges at 3am cause the worst conflicts.

## Suggested hackathon schedule

| When | Both of you |
| --- | --- |
| First hour | Both get the site running locally (`npm install`, `npm run dev`). Click every page. Read `README.md`. |
| Next few hours | Work on your own files. Make small changes first (change text, colors, add a housing place) to learn how things connect. |
| Middle | Each build one "next idea" from your list. |
| Last 2–3 hours | **Stop adding features.** Fix bugs, test on your phone, write the Devpost, and practice the demo. |

## Demo script (2 minutes)

1. **Problem (15s):** "Choosing housing at Temple is confusing, and official sites don't tell you what it's *really* like."
2. **Home (15s):** Show the search, top-rated places, and latest reviews.
3. **Browse, then a place (30s):** Filter to "Freshman-friendly", open Morgan Hall, and show the rating breakdown.
4. **Write a review (30s):** Submit one live and show that it appears instantly.
5. **Pricing (20s):** Show the budget calculator going over or under budget.
6. **What's next (10s):** Real database, Temple login, map view, photos.
