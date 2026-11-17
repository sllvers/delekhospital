# Delek Hospital content editing

## Implemented
- `/admin/` uses Decap CMS 3.17.3 (pinned CDN release).
- News and stories are Markdown in `src/content/news` and `src/content/stories`.
- Astro validates fields at build time. Drafts never generate public detail routes,
  homepage cards or navigation entries. Stories also require `consentConfirmed: true`.
- Empty public indexes and the editor are excluded from the sitemap.
- Production shows a setup notice until PUBLIC_DECAP_AUTH_URL is configured.
- With no auth URL, `pnpm dev` offers an in-memory Decap test backend: demo edits
  do NOT write Markdown, commit to GitHub or survive a reset. This is not staff login.
- There are no published entries. The two clearly marked editor guides are drafts.

## Account setup still required — do not deploy yet
1. Confirm the production branch is `main` in `sllvers/delekhospital`.
2. Choose a maintainer and staff GitHub accounts. Decap's GitHub backend requires
   repository write access. Configure branch protection and required review on main
   before inviting staff; Decap's editorial interface alone is not a permission boundary.
3. Set up a Decap-compatible GitHub OAuth service (separate from the contact Worker).
   The service must support `/auth` and the Decap popup response protocol, validate
   OAuth state, restrict allowed origins to the editor, and keep the client secret
   in Worker secrets. Do not paste secrets into chat or commit them.
4. Register a GitHub OAuth app with the service's actual callback URL. We must first
   choose the service URL; no placeholder DNS records or OAuth credentials have been created.
5. Set PUBLIC_DECAP_AUTH_URL to the HTTPS origin of that service in the site build
   environment. This URL is public; OAuth secrets are not site environment variables.
6. After authorization to push/deploy: test staff login, create a draft, save it,
   inspect its GitHub pull request, review, merge, and confirm the approved build.
   Test rejection and unauthorized access as well. No live OAuth flow has been verified.

## Staff workflow
Create an entry, enter approved text, and keep “Keep off the public website” enabled
until approval. A confirmed news publication date is required for published news.
Patient stories additionally require the consent checkbox. Optional quotes and public
names must be explicitly approved. Preview links must be connected to branch deployments
before relying on them. Move the entry through draft and review; an authorized maintainer
publishes/merges after review and passing checks. Production deployment must remain main-only.

Media uploaded through Decap goes to `public/uploads` and Markdown uses `/uploads/...`.
Only upload publication-approved images; never upload patient records or consent forms.
Use descriptive Markdown alt text. Public-folder uploads are not automatically optimized
by Astro's imported-image pipeline; resize/compress them before upload.

## Validation
Run `pnpm build` and `python3 scripts/check-links.py` before merging.
The support page, donation integration, Workers static configuration and DNS are unchanged.

References:
- https://decapcms.org/docs/github-backend/
- https://decapcms.org/docs/editorial-workflows/
- https://docs.astro.build/en/guides/content-collections/
