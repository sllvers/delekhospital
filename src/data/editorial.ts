import { getCollection } from 'astro:content';

// Only approved, non-draft entries reach public pages, navigation and the sitemap.
export const news = (await getCollection('news', ({ data }) => !data.draft))
  .sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? '') || a.id.localeCompare(b.id))
  .map(entry => ({ ...entry.data, slug: entry.id, entry }));
export const stories = (await getCollection('stories', ({ data }) => !data.draft && data.consentConfirmed))
  .sort((a, b) => a.id.localeCompare(b.id))
  .map(entry => ({ ...entry.data, slug: entry.id, entry }));
