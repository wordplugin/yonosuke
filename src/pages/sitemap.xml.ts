/** 検索エンジン向けのサイトマップ */
import type { APIRoute } from 'astro';
import { getSitemap, flatten } from '../sitemap';

export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const origin = (site?.origin ?? '').replace(/\/$/, '');
  const urls = flatten(await getSitemap())
    .map((e) => {
      const lastmod = e.lastmod ? `<lastmod>${e.lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
      return `  <url><loc>${origin}${base}${e.path}</loc>${lastmod}</url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
