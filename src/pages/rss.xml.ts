import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const escapeXml = (value: string) => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://example.com');
  const notes = (await getCollection('notes', ({data}) => !data.draft))
    .sort((a,b) => b.data.publishedAt.getTime()-a.data.publishedAt.getTime());
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>Zeeshan Haider — Notes</title>
<link>${escapeXml(new URL('/notes/',base).href)}</link>
<description>Writing about design, interfaces, and learning front-end development.</description>
<language>en</language>
${notes.map(note=>`<item><title>${escapeXml(note.data.title)}</title><link>${escapeXml(new URL(`/notes/${note.id}/`,base).href)}</link><guid isPermaLink="true">${escapeXml(new URL(`/notes/${note.id}/`,base).href)}</guid><description>${escapeXml(note.data.description)}</description><pubDate>${note.data.publishedAt.toUTCString()}</pubDate></item>`).join('\n')}
</channel></rss>`;
  return new Response(feed,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
};
