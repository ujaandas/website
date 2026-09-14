import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const work = defineCollection({
    loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx,mdoc}" }),
    schema: z.object({
        company: z.string(),
        role: z.string(),
        startDate: z.date(),
        endDate: z.union([z.coerce.date(), z.literal("Present")]),
        description: z.string(),
    }),
});

const writing = defineCollection({
    loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx,mdoc}" }),
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

const quotes = defineCollection({
    loader: glob({ base: "./src/content/quotes", pattern: "**/*.{yaml,json,md,mdoc}" }),
    schema: z.object({
        quote: z.string(),
        author: z.string().optional(),
    }),
});

const reads = defineCollection({
    loader: glob({ base: "./src/content/reads", pattern: "**/*.{yaml,json,md,mdoc}" }),
    schema: z.object({
        title: z.string(),
        author: z.string().optional(),
        status: z.enum(["reading", "read"]),
        shelf: z.string(),
        recommend: z.boolean().optional(),
        cover: z.string().optional(),
        date: z.date().optional(),
        url: z.string().optional(),
    }),
});

export const collections = { work, writing, projects, pages, quotes, reads };