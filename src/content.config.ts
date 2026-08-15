import { defineCollection, } from "astro:content";
import { z } from "astro/zod"
import { glob, file } from 'astro/loaders';

const work = defineCollection({
    loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx,mdoc}' }),
    schema: z.object({
        company: z.string(),
        role: z.string(),
        startDate: z.date(),
        endDate: z.union([z.date(), z.literal("Present")]),
        description: z.string(),
    }),
});

const writing = defineCollection({
    loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx,mdoc}' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
    }),
});

const projects = defineCollection({
    loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx,mdoc}" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            date: z.date(),
            href: z.string(),
            image: image().optional(),
        }),
});

const pages = defineCollection({
    loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx,mdoc}" }),
    schema: z.object({
        title: z.string().default("About Me"),
        description: z.string().optional(),
    }),
});

export const collections = { work, writing, projects, pages };