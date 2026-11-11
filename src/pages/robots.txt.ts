/** 検索エンジン向けの案内。制作中(draft)の間は、全ページの登録を断る */
import type { APIRoute } from 'astro';
import { site as config } from '../config';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const origin = (site?.origin ?? '').replace(/\/$/, '');
  const body = config.draft
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${origin}${base}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
