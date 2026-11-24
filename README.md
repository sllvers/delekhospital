# Delek Hospital website

Static site for Tibetan Delek Hospital, Dharamshala, built with Astro and deployed to Cloudflare (see `wrangler.jsonc`).

## Run it

```sh
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # output in dist/
```

## Where things live

- `src/pages/` – one file per page (Home, About, History = `milestones.astro`, Team, Find Care, Our Impact, Partner With Us, Support, Contact).
- `src/data/` – content you will update most often:
  - `care.ts` / `schedule-schema.ts` – loads and validates the clinic schedule from Sanity.
  - `programs.ts` – public health programs.
  - `editorial.ts` – loads published news and stories from Sanity. Stories and News stay hidden until published entries exist.
  - `locations.ts` – facilities, addresses and map links.
  - `navigation.ts` – main menu.
- `src/assets/` – images used by the site. `media/` holds spare files (unused staff portraits, the seal logo) that are not part of the build.
- `public/` – favicons and `robots.txt`.

## Before launch

See `CONTENT_REVIEW.md` for facts that still need the hospital's sign-off, and `CLIENT_PHOTOS.md` / `SERVICE_PHOTO_CREDITS.md` for photo sources.

## Content editor

Staff edit the clinic schedule, news and stories in Sanity Studio (`studio/`). See [CMS_SETUP.md](CMS_SETUP.md) for setup, publishing and inviting staff.
