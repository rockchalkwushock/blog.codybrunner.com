import {
	defineCollection,
	reference,
	z,
	type CollectionEntry,
} from 'astro:content'

const authorSchema = z.object({
	avatar: z.string().url(),
	bio: z.string(),
	coffee: z.string().url(),
	email: z.string().email(),
	github: z.string().url(),
	linkedIn: z.string().url(),
	name: z.string(),
	twitter: z.string().url(),
})

const CATEGORIES = ['expat', 'personal', 'technology', 'travel'] as const
const CategoriesEnum = z.enum(CATEGORIES)
const categoriesSchema = z.array(CategoriesEnum).optional()

const EXPAT_TAGS = [''] as const
const PERSONAL_TAGS = [''] as const
const TECH_TAGS = [
	'astro',
	'ci-cd',
	'cli',
	'cloudflare',
	'deploy',
	'docker',
	'ecto',
	'elixir',
	'fly',
	'github-actions',
	'go',
	'graphql',
	'hugo',
	'iterm',
	'javascript',
	'macos',
	'make',
	'nextjs',
	'nodejs',
	'pnpm',
	'psql',
	'python',
	'qwik',
	'qwik-city',
	'reactjs',
	'scripting',
	'ssh',
	'tailwindcss',
	'turso',
	'typescript',
	'vscode',
	'yarn',
	'zsh',
] as const
const TRAVEL_TAGS = ['colombia'] as const
const TAGS = [
	...EXPAT_TAGS,
	...PERSONAL_TAGS,
	...TECH_TAGS,
	...TRAVEL_TAGS,
] as const
const TagsEnum = z.enum(TAGS)
const tagsSchema = z.array(TagsEnum).optional()

const articleSchema = z.object({
	archived: z.boolean().default(false),
	author: reference('authors'),
	canonicalURL: z.string().url(),
	categories: categoriesSchema,
	coverImage: z
		.object({
			alt: z.string(),
			src: z.string().or(z.string().url()),
		})
		.optional(),
	createdAt: z.string().transform(str => new Date(str)),
	description: z.string(),
	draft: z.boolean().default(true),
	featured: z.boolean().default(false),
	language: z.enum(['en', 'es']).default('en'),
	publishedAt: z
		.string()
		.transform(str => new Date(str))
		.optional(),
	relatedArticles: z.array(reference('articles')).default([]),
	tags: tagsSchema,
	timeToRead: z.string().optional(),
	title: z.string(),
	updatedAt: z
		.string()
		.transform(str => new Date(str))
		.optional(),
	wordCount: z.number().optional(),
})

export const collections = {
	articles: defineCollection({
		schema: articleSchema,
		type: 'content',
	}),
	authors: defineCollection({
		schema: authorSchema,
		type: 'data',
	}),
}

export type Article = CollectionEntry<'articles'>
export type Author = CollectionEntry<'authors'>
export type CategoryEnum = z.infer<typeof CategoriesEnum>
export type TagsEnum = z.infer<typeof TagsEnum>
