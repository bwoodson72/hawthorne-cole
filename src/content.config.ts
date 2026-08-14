import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const attorneys = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/attorneys' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    eyebrow: z.string(),
    intro: z.string(),
    shortBio: z.string(),
    portrait: z.string().optional(),
    practiceAreas: z.array(reference('practiceAreas')).min(1),
    education: z.array(z.object({ institution: z.string(), degree: z.string() })),
    admissions: z.array(z.string()),
    memberships: z.array(z.string()).default([]),
    philosophy: z.string(),
    cta: z.string(),
    featured: z.boolean().default(false),
    seo: seoSchema,
  }),
});

const practiceAreas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/practice-areas' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    headline: z.string(),
    summary: z.string(),
    heroCopy: z.string(),
    services: z.array(z.string()).min(1),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
    seo: seoSchema.optional(),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    author: reference('attorneys'),
    practiceArea: reference('practiceAreas'),
    publishedDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    complete: z.boolean().default(true),
    closingCta: z.string().optional(),
    seo: seoSchema.optional(),
  }),
});

const matters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/matters' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    practiceArea: reference('practiceAreas'),
    attorneys: z.array(reference('attorneys')).min(1),
    summary: z.string(),
    outcomePreview: z.string(),
    situation: z.string(),
    approach: z.string(),
    outcome: z.string(),
    disclosure: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { attorneys, practiceAreas, insights, matters };
