import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const policies = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/policies' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      numeral: z.string(),
      title: z.string(),
      lead: z.string(),
      tag: z.string(),
      photo: image().optional(),
      photoAlt: z.string().optional(),
      /** 写真を枠に合わせて切るときに、どこを残すか(CSS の object-position。人物の位置に合わせる) */
      photoPosition: z.string().default('50% 25%'),
      /** 「香川県の現状」に出す統計。source は sources の何番目か(1 から数える) */
      stats: z
        .array(
          z.object({
            value: z.string(),
            unit: z.string().optional(),
            label: z.string(),
            detail: z.string().optional(),
            source: z.number(),
          }),
        )
        .default([]),
      /** 統計を受けた現状の説明文 */
      context: z.string().optional(),
      /** この政策に取り組む理由になる、本人の経験(プロフィールと原稿にもとづく) */
      experience: z.string().optional(),
      /** トップに出す、経験の一言 */
      experienceShort: z.string().optional(),
      /** この政策に関わりのある役職 */
      roles: z.array(z.string()).default([]),
      /** 統計の出典。公的機関の一次資料に限る */
      sources: z.array(z.object({ title: z.string(), org: z.string(), url: z.string().url() })).default([]),
    }),
});

const activity = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/activity' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string(),
      /** 関連する政策の柱(policies の tag) */
      tags: z.array(z.string()).default([]),
      photo: image().optional(),
      photoAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { policies, activity };
