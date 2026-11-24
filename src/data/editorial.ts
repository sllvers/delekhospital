import { getCollection } from 'astro:content';

// Only published Sanity documents are loaded (see src/content.config.ts).
// Stories additionally require confirmed consent.
export const news = (await getCollection('news'))
  .sort((a, b) => b.data.date.localeCompare(a.data.date) || a.id.localeCompare(b.id))
  .map(entry => ({ ...entry.data, slug: entry.id, entry }));
export const stories = (await getCollection('stories', ({ data }) => data.consentConfirmed))
  .sort((a, b) => a.id.localeCompare(b.id))
  .map(entry => ({ ...entry.data, slug: entry.id, entry }));
