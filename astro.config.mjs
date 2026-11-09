// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://delekhospital.org',
  // Match directory index output and Cloudflare Workers' default HTML handling.
  trailingSlash: 'always',
  // All current generated routes are public and indexable.
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
