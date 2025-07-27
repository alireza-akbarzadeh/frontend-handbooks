import { defineCollection, z } from 'astro:docs';

const docsCollection = defineCollection({
    type: 'docs',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        publishedDate: z.date().optional(),
        updatedDate: z.date().optional(),
        order: z.number().optional(),
        tags: z.array(z.string()).optional(),
        relatedTopics: z.object({
            html: z.array(z.string()).optional(),
            css: z.array(z.string()).optional(),
            javascript: z.array(z.string()).optional(),
            frameworks: z.array(z.string()).optional(),
            tools: z.array(z.string()).optional(),
        }).optional(),
    }),
});

export const collections = {
    'docs': docsCollection,
};