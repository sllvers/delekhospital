import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const common = {
  title: z.string().trim().min(1),
  draft: z.boolean().default(true),
};
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    ...common,
    summary: z.string().trim().min(1),
    date: z.preprocess(value => value === null || value === '' ? undefined : value, z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
      const parsed = new Date(value);
      return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
    }, 'Use a real date in YYYY-MM-DD format').optional()),
  }).refine(data => data.draft || Boolean(data.date), { message: 'Published news requires a confirmed date', path: ['date'] }),
});
const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    ...common,
    excerpt: z.string().trim().min(1),
    quote: z.string().optional(),
    name: z.string().optional(),
    consentConfirmed: z.boolean().default(false),
  }),
});
export const collections = { news, stories };
