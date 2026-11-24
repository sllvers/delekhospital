# Delek Hospital content editing (Sanity)

Hospital staff edit content in **Sanity Studio**, a hosted editor. Staff sign in
with Google or email. No GitHub account is needed and they cannot touch the code.

- Sanity project: `ep4aoi37`, dataset `production` (public, read-only API)
- Studio code: `studio/` (separate from the website; installed on its own)
- Website: reads published content from Sanity when it builds (`src/lib/sanity.ts`)

## What staff can edit

| In Studio | On the website |
| --- | --- |
| Clinic schedule | Schedules, Services and the Find Care planner |
| Hospital news | Homepage news, /news/ |
| Patient & community stories | Homepage story, /impact-stories/ |

- **Drafts are private.** Only the Publish button sends content to the website.
- **Stories need consent.** A story can't be published until "Publication consent
  confirmed" is ticked. Never upload consent forms or patient records.
- **News needs a publication date** before it can be published.
- **Clinic schedule:** the clinic list and the five Saturdays are fixed because
  service links depend on them. Clinics can't be added, removed or reordered in
  Studio; ask the website maintainer. Leave hours blank to show "Call to confirm",
  or enter "Closed" for a confirmed closure. Weekday ticks and "Days shown to
  visitors" must agree (both blank for by-arrangement clinics).
- The same schedule rules are checked again by the website build
  (`src/data/schedule-schema.ts`). If a published schedule breaks them, the build
  fails and the live site keeps its previous version.
- Changes appear after the site rebuilds (a minute or two), not instantly.

## One-time setup (owner)

Run these on your Mac.

1. **Install and import the existing schedule**
   ```sh
   cd studio
   pnpm install
   pnpm sanity login          # same Google account that owns the project
   pnpm import-content        # copies studio/seed/schedule.json into Sanity
   ```
   The import never overwrites a schedule that already exists.
2. **Try Studio locally:** `pnpm dev` → http://localhost:3333. Check the schedule,
   then click **Publish** on it once. The website build fails until a published
   schedule exists.
3. **Deploy Studio:** `pnpm run deploy` (not `pnpm deploy`, which is a different built-in pnpm command). This hosts it at
   `https://delekhospital.sanity.studio/` (change `studioHost` in
   `studio/sanity.cli.ts` if that name is taken).
4. **Rebuild on publish.** In Cloudflare: Workers & Pages → `delekhospital` →
   Settings → Builds → Deploy Hooks → create one for `main` and copy the URL.
   In sanity.io/manage → project → API → Webhooks → add a webhook:
   - URL: the Deploy Hook URL, method POST, dataset `production`
   - Trigger on create, update and delete; filter `_type in ["clinicSchedule", "news", "story"]`
   - Leave drafts and versions off

   Treat the Deploy Hook URL like a password: anyone with it can trigger builds.
   Never commit it.
5. **Test:** change a note on the schedule, publish, and confirm the Cloudflare
   build runs and the change is live.

## Inviting staff

sanity.io/manage → project → Members → Invite. On the Free plan the only roles
are Administrator and Viewer, so anyone who edits is an Administrator (they can
also delete content and invite others). Limited Editor/Contributor roles need the
Growth plan. Sanity also has a non-profit plan that may apply to the hospital.

## Local development

`pnpm dev` and `pnpm build` in the website fetch published content from Sanity,
so they need an internet connection. A failed Sanity request stops the build
rather than publishing a site with missing content.
