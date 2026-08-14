import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
    storage: {
        kind: "local",
    },
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