// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://delekhospital.org',
  // Accept existing slashless links in dev. Directory output, sitemap and
  // canonicals retain trailing slashes; Cloudflare normalizes production URLs.
  trailingSlash: 'ignore',
  // All current generated routes are public and indexable.
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
