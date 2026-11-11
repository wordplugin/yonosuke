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
