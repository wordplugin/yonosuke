/** サイト内の全ページの一覧。サイトマップのページと、検索エンジン向けの sitemap.xml の両方で使う */
import { getCollection } from 'astro:content';
import { site } from './config';
import { getPosts } from './lib';

export type SitemapEntry = { path: string; label: string; lastmod?: Date; children?: SitemapEntry[] };

export async function getSitemap(): Promise<SitemapEntry[]> {
  const policies = (await getCollection('policies')).sort((a, b) => a.data.order - b.data.order);
  const posts = await getPosts();
  const entries: SitemapEntry[] = [
    { path: '/', label: 'トップ' },
    { path: '/message/', label: '県政への決意' },
    {
      path: '/policy/',
      label: '政策(取り組みたい五つの柱)',
      children: policies.map((p) => ({ path: `/policy/${p.id}/`, label: `${p.data.numeral} ${p.data.title}` })),
    },
    { path: '/profile/', label: 'プロフィール' },
    {
      path: '/activity/',
      label: '活動報告',
      lastmod: posts[0]?.data.date,
      children: posts.map((p) => ({ path: `/activity/${p.id}/`, label: p.data.title, lastmod: p.data.date })),
    },
    { path: '/schedule/', label: '日程' },
    { path: '/support/', label: '応援する', children: [{ path: '/koenkai/', label: '後援会入会のお申し込み' }] },
    { path: '/contact/', label: 'ご意見・お問い合わせ' },
    { path: '/privacy/', label: 'プライバシーポリシー' },
    { path: '/site-policy/', label: 'サイトポリシー' },
    { path: '/sitemap/', label: 'サイトマップ' },
  ];
  // 選挙特設ページは、選挙運動期間だけ存在する
  if (site.mode === 'campaign') entries.splice(1, 0, { path: '/election/', label: '選挙特設(投票のご案内)' });
  return entries;
}

export function flatten(entries: SitemapEntry[]): SitemapEntry[] {
  return entries.flatMap((e) => [e, ...flatten(e.children ?? [])]);
}
