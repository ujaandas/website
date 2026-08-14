import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    singletons: {
        me: singleton({
            label: 'About Me Page',
            path: 'src/content/pages/me',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Title', defaultValue: 'About Me' }),
                description: fields.text({ label: 'SEO Description' }),
                content: fields.markdoc({ label: 'Content' }),
            },
        }),
    },
    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                date: fields.date({ label: 'Publish Date' }),
                content: fields.markdoc({ label: 'Content' }),
            },
        }),
        projects: collection({
            label: 'Projects',
            slugField: 'title',
            path: 'src/content/projects/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                description: fields.text({ label: 'Short Description', multiline: true }),
                href: fields.text({ label: 'Project URL (GitHub/Live Site)' }),
                thumbnail: fields.image({
                    label: "Thumbnail",
                    directory: "src/assets/images/projects",
                    publicPath: "@/assets/images/projects"
                }),
                content: fields.markdoc({ label: 'Content (Optional)' }),
            },
        }),
        work: collection({
            label: 'Work Experience',
            slugField: 'company',
            path: 'src/content/work/*',
            format: { contentField: 'content' },
            schema: {
                company: fields.slug({ name: { label: 'Company' } }),
                role: fields.text({ label: 'Job Title / Role' }),
                startDate: fields.date({ label: 'Start Date' }),
                endDate: fields.date({ label: 'End Date' }),
                content: fields.markdoc({ label: 'Job Description Details' }),
            },
        }),
    },
});