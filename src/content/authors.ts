import { defineCollection, z, type CollectionEntry } from 'astro:content'

const authorSchema = z.object({
	avatar: z.string().url(),
	bio: z.string(),
	email: z.string().email(),
	github: z.string().url(),
	instagram: z.string().url(),
	linkedIn: z.string().url(),
	name: z.string(),
	telegram: z.string().url(),
	twitter: z.string().url(),
})

export type Author = CollectionEntry<'authors'>

export const authorsCollection = defineCollection({
	schema: authorSchema,
	type: 'data',
})
