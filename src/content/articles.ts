import {
	defineCollection,
	reference,
	z,
	type CollectionEntry,
} from 'astro:content'
import { categoriesSchema, tagsSchema } from './taxonomy'

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
	relatedArticles: z.array(reference('articles')).optional(),
	tags: tagsSchema,
	title: z.string(),
	updatedAt: z
		.string()
		.transform(str => new Date(str))
		.optional(),
})

export type Article = CollectionEntry<'articles'>

export const articlesCollection = defineCollection({
	schema: articleSchema,
	type: 'content',
})
