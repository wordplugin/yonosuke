import { getCollection } from 'astro:content';

/** 公開する活動報告を新しい順に返す */
export async function getPosts() {
  return (await getCollection('activity', (p) => !p.data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
