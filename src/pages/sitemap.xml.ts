import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://example.com');
  const staticPaths = ['/', '/work/', '/about/', '/resume/', '/notes/', '/notes/learning-log/', '/contact/'];
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  const paths = [
    ...staticPaths,
    ...projects.map(p => `/work/${p.id}/`),
    ...notes.map(n => `/notes/${n.id}/`),
  ];
  const esc = (s: string) => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(path => `  <url><loc>${esc(new URL(path,base).toString())}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
