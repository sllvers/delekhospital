export interface Story { title: string; excerpt: string; slug: string; body: string[]; }
// Add only hospital-approved stories with publication consent. Routes and homepage cards generate automatically.
export const stories: Story[] = [];
export interface NewsItem { title: string; summary: string; date: string; slug: string; body: string[]; }
// date: YYYY-MM-DD. Add confirmed hospital announcements here.
export const news: NewsItem[] = [];
