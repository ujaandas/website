import { config, fields, collection, singleton } from "@keystatic/core";

const isProd = import.meta.env.PROD;

export default config({
    storage: isProd
        ? { kind: "github", repo: "ujaandas/website" }
        : { kind: "local" },
    singletons: {
        me: singleton({
            label: "About Me Page",
            path: "src/content/pages/me",
            format: { contentField: "content" },
            schema: {
                title: fields.text({ label: "Title", defaultValue: "About Me" }),
                description: fields.text({ label: "SEO Description" }),
                content: fields.markdoc({ label: "Content" }),
            },
        }),
    },
    collections: {
        quotes: collection({
            label: "Quotes",
            slugField: "quote",
            path: "src/content/quotes/*",
            format: { data: "yaml" },
            schema: {
                quote: fields.slug({ name: { label: "Quote" } }),
                author: fields.text({ label: "Author (Leave blank if self)" }),
            },
        }),
        reads: collection({
            label: "Reads",
            slugField: "title",
            path: "src/content/reads/*",
            format: { data: "yaml" },
            schema: {
                title: fields.slug({ name: { label: "Title" } }),
                author: fields.text({
                    label: "Author (optional)",
                    description: "Leave blank and run `pnpm reads:fetch-covers` to backfill it from Open Library.",
                }),
                status: fields.select({
                    label: "Status",
                    options: [
                        { label: "Currently reading", value: "reading" },
                        { label: "Read", value: "read" },
                    ],
                    defaultValue: "read",
                }),
                shelf: fields.text({
                    label: "Shelf",
                    description: "e.g. Computer Science, Machine Learning, Classics",
                }),
                recommend: fields.checkbox({
                    label: "Recommend it",
                    defaultValue: false,
                }),
                cover: fields.text({
                    label: "Cover image URL (optional)",
                    description: "Leave blank and run `pnpm reads:fetch-covers` to download and save one locally. Paste a URL here only to override.",
                }),
                date: fields.date({ label: "Date finished", description: "Leave blank if still reading" }),
                url: fields.text({ label: "Link (Goodreads, publisher, etc.)" }),
            },
        }),
        writing: collection({
            label: "Writing",
            slugField: "title",
            path: "src/content/writing/*",
            format: { contentField: "content" },
            schema: {
                title: fields.slug({ name: { label: "Title" } }),
                date: fields.date({ label: "Publish Date" }),
                content: fields.markdoc({ label: "Content" }),
            },
        }),
        projects: collection({
            label: "Projects",
            slugField: "title",
            path: "src/content/projects/*",
            format: { contentField: "content" },
            schema: {
                title: fields.slug({ name: { label: "Title" } }),
                description: fields.text({ label: "Short Description", multiline: true }),
                date: fields.date({ label: "Date" }),
                href: fields.text({ label: "Project URL (GitHub/Live Site)" }),
                image: fields.image({
                    label: "Thumbnail / Cover Image",
                    directory: "src/assets/images/projects",
                    publicPath: "../../assets/images/projects/",
                }),
                content: fields.markdoc({ label: "Content (Optional)" }),
            },
        }),
        work: collection({
            label: "Work Experience",
            slugField: "company",
            path: "src/content/work/*",
            format: { contentField: "content" },
            schema: {
                company: fields.slug({ name: { label: "Company" } }),
                role: fields.text({ label: "Job Title / Role" }),
                startDate: fields.date({ label: "Start Date" }),
                endDate: fields.text({
                    label: "End Date",
                    description: "Enter a date (YYYY-MM-DD) or 'Present'",
                }),
                description: fields.text({ label: "Brief Description", multiline: true }),
                content: fields.markdoc({ label: "Detailed Bullet Points" }),
            },
        }),
    },
});