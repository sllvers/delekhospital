import { defineCollection, z } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { sanityQuery } from './lib/sanity';
import { portableTextToHtml } from './lib/portable-text';

// News and stories are edited in Sanity Studio (studio/). Only published
// documents are fetched; drafts never reach the website.
function sanityLoader(type: string, fields: string): Loader {
  return {
    name: `sanity-${type}`,
    async load({ store, parseData, generateDigest }) {
      const docs = await sanityQuery<({ id: string; body?: unknown[] } & Record<string, unknown>)[]>(
        `*[_type == "${type}" && defined(slug.current)]{ "id": slug.current, ${fields}, body }`,
      );
      const seen = new Set<string>();
      store.clear();
      for (const { id, body, ...raw } of docs) {
        if (seen.has(id)) throw new Error(`Two published ${type} documents use the page address "${id}".`);
        seen.add(id);
        const data = await parseData({ id, data: raw });
        const html = portableTextToHtml(body as never);
        store.set({ id, data, rendered: { html }, digest: generateDigest({ data, html }) });
      }
    },
  };
}

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const parsed = new Date(value);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}, 'Use a real date in YYYY-MM-DD format');

const news = defineCollection({
  loader: sanityLoader('news', 'title, summary, date'),
  schema: z.object({
    title: z.string().trim().min(1),
    summary: z.string().trim().min(1),
    date,
  }),
});
const stories = defineCollection({
  loader: sanityLoader('story', 'title, excerpt, quote, name, "consentConfirmed": coalesce(consentConfirmed, false)'),
  schema: z.object({
    title: z.string().trim().min(1),
    excerpt: z.string().trim().min(1),
    quote: z.string().nullish(),
    name: z.string().nullish(),
    consentConfirmed: z.boolean(),
  }),
});
export const collections = { news, stories };
