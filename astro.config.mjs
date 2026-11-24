// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// https://astro.build/config
export default defineConfig({
  site: 'https://delekhospital.org',
  // Accept existing slashless links in dev. Directory output, sitemap and
  // canonicals retain trailing slashes; Cloudflare normalizes production URLs.
  trailingSlash: 'ignore',
  // Exclude any generated page explicitly marked noindex.
  integrations: [sitemap({
    filter(page) {
      const pathname = new URL(page).pathname;
      const file = new URL(`./dist${pathname.replace(/\/$/, '')}/index.html`, import.meta.url);
      const html = readFileSync(file, 'utf8');
      return !/<meta\s+[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html);
    },
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});
