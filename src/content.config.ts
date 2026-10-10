import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(), description: z.string(), category: z.enum(['ui','social','dev']),
    filters: z.array(z.enum(['ui','social','dev'])).default([]),
    tags: z.array(z.string()).default([]),
    showcaseLabel: z.string(),
    preview: z.enum(['etg','startex','pulse','abstract']).default('abstract'),
    cover: z.string().optional(),
    /** Add only verified deliverables and actual media; gallery is optional. */
    gallery: z.array(z.object({src: z.string(), alt: z.string().min(8), caption: z.string().optional()})).default([]),
    projectUrl: z.string().url().optional(),
    repositoryUrl: z.string().url().optional(),
    outcome: z.string().optional(),
    process: z.string().optional(),
    year: z.string().optional(),
    sortOrder: z.number(), featured: z.boolean().default(false),
    role: z.string(), engagement: z.string(), contribution: z.string(),
    context: z.string(), deliverables: z.string(),
    draft: z.boolean().default(false),
  }),
});
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(), description: z.string(), category: z.enum(['article','insight','learning']),
    publishedAt: z.coerce.date(), draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]), cover: z.string().optional(),
  }),
});
export const collections = { projects, notes };
