# Website readiness progress

## Decisions
- Separate Cloudflare Worker, Turnstile and email API for contact submissions; provider and account setup pending.
- Decap CMS with draft/review workflow approved; authentication and staff access setup pending.
- No push, deployment or DNS changes authorized. Support page and donation flow are excluded from changes.

## Phase 0 checkpoint
- Pinned Node 22.22.3 and pnpm 10.34.1; explicitly allowed esbuild installation script. Install and build pass without warnings.
- Opened all 26 generated routes at 1440px and 390px. DOM measurements found no horizontal page overflow or failed completed images. This does not establish that every lazy-loaded image was fetched.
- Visually inspected the mobile Team page and desktop/mobile History decade navigation. Corrected a one-pixel overlap with the sticky header.
- Exercised the homepage program slider: Next advanced to slide 2 and updated the announced status.
- Fixed ten generated links using the nonexistent main-hospital fragment. Added scripts/check-links.py to check built internal destinations and fragments.
- Support source remains unchanged.

## Still outstanding
- Full-page visual inspection of every route, lazy-image loading and external destination checks. Current automated viewport measurements are not a complete visual or WCAG audit.
- Homepage reach figures, leadership roles, dates and clinical schedules still require the confirmations listed in CONTENT_REVIEW.md.
- Phase 1: editorial styles, responsive image conversion, client service photos, click-to-load homepage map and full accessibility pass.
- Phase 2: data extraction, content collections, route migration, 404, metadata/JSON-LD, stylesheet consolidation, Tibetan routing, Worker and Decap implementation.
- Phase 3: CI, preview/production deployment separation, headers, historical WordPress URL inventory/redirects, analytics and launch checklist.
- No phases are marked complete until their remaining checks and implementation are finished.

## Decap implementation checkpoint
- Added validated news/story Markdown collections, publication filters, Decap editor configuration and setup documentation.
- Content editor moved from Decap to Sanity Studio (project ep4aoi37). Pending: schedule import, Studio deploy and Cloudflare deploy-hook webhook; see CMS_SETUP.md.
- Drafts, stories without consent, empty indexes and admin are excluded from public sitemap output.
- Live staff login, review permissions and publishing/deployment remain unverified pending account setup and deployment approval.
