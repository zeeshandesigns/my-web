import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://example.com');
  const indexingEnabled = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true' && base.hostname !== 'example.com';
  const content = indexingEnabled
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', base)}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
