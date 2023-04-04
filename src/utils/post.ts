import type { CategoryEnum, Post, TagEnum } from '../content/config'

type ArchivedMap = Record<
	string,
	{
		count: number
		posts: Post[]
	}
>

export function createArchivedMap(posts: Post[]): ArchivedMap {
	return posts.reduce<ArchivedMap>((acc, post) => {
		const year = new Date(
			post.data.publishedAt ?? post.data.createdAt
		).getFullYear()

		if (!Object.keys(acc).includes(String(year))) {
			acc[year] = {
				count: 1,
				posts: [post],
			}
			return acc
		}

		if (Object.keys(acc).includes(String(year))) {
			acc[year] = {
				count: (acc[year]?.count as number) + 1,
				posts: [...(acc[year]?.posts as Post[]), post].sort(isBefore),
			}
		}

		return acc
	}, {})
}

export function filterPosts(
	posts: Post[],
	cb: (post: Post) => boolean
): Post[] {
	return posts.filter(cb)
}

export function pickPosts(posts: Post[], idx = 0): Post[] {
	return posts.slice(0, idx)
}

export function sortPosts(
	posts: Post[],
	cb: (postA: Post, postB: Post) => number
): Post[] {
	return posts.sort(cb)
}

export const hasCategory = (post: Post, category: CategoryEnum): boolean =>
	typeof post.data.categories !== 'undefined'
		? post.data.categories.includes(category)
		: false
export const hasTag = (post: Post, tag: TagEnum): boolean =>
	typeof post.data.tags !== 'undefined' ? post.data.tags.includes(tag) : false

export function getCategoryCount(posts: Post[]): Record<CategoryEnum, number> {
	const initialValue: Record<CategoryEnum, number> = {
		expat: 0,
		personal: 0,
		technology: 0,
		travel: 0,
	}
	return posts.reduce<typeof initialValue>((acc, { data: { categories } }) => {
		if (typeof categories === 'undefined') return acc
		categories.forEach(category => {
			if (typeof acc[category] === 'undefined') {
				acc[category] = 1
			} else {
				acc[category] += 1
			}
		})
		return acc
	}, initialValue)
}

export function getTagCount(posts: Post[]): Record<TagEnum, number> {
	const initialValue: Record<TagEnum, number> = {
		absinthe: 0,
		asd: 0,
		ash: 0,
		astrojs: 0,
		autism: 0,
		aws: 0,
		'ci-cd': 0,
		cli: 0,
		cloudflare: 0,
		colombia: 0,
		deploy: 0,
		django: 0,
		dns: 0,
		docker: 0,
		'docker-compose': 0,
		ecto: 0,
		elixir: 0,
		erlang: 0,
		family: 0,
		fly: 0,
		git: 0,
		graphql: 0,
		hasura: 0,
		hugo: 0,
		immigration: 0,
		iterm: 0,
		javascript: 0,
		linux: 0,
		macos: 0,
		marriage: 0,
		mdx: 0,
		nextjs: 0,
		netlify: 0,
		nodejs: 0,
		opinion: 0,
		oss: 0,
		phoenix: 0,
		'phoenix-liveview': 0,
		pnpm: 0,
		psql: 0,
		python: 0,
		'raspberry-pi': 0,
		reactjs: 0,
		'react-query': 0,
		rust: 0,
		solidjs: 0,
		solidstart: 0,
		sql: 0,
		ssh: 0,
		storybookjs: 0,
		svelte: 0,
		sveltekit: 0,
		tailwindcss: 0,
		typescript: 0,
		vercel: 0,
		vitejs: 0,
		vitest: 0,
		vscode: 0,
		yarn: 0,
		zsh: 0,
	}
	return posts.reduce<typeof initialValue>((acc, { data: { tags } }) => {
		if (typeof tags === 'undefined') return acc
		tags.forEach(tag => {
			if (typeof acc[tag] === 'undefined') {
				acc[tag] = 1
			} else {
				acc[tag] += 1
			}
		})
		return acc
	}, initialValue)
}

export const isArchived = (post: Post): boolean => post.data.archived
export const isAfter = ({ data: p1 }: Post, { data: p2 }: Post): number => {
	const date1 =
		p1.updatedAt !== undefined
			? p1.updatedAt
			: p1.publishedAt !== undefined
			? p1.publishedAt
			: p1.createdAt

	const date2 =
		p2.updatedAt !== undefined
			? p2.updatedAt
			: p2.publishedAt !== undefined
			? p2.publishedAt
			: p2.createdAt

	return date1.getTime() < date2.getTime() ? 1 : -1
}
export const isBefore = ({ data: p1 }: Post, { data: p2 }: Post): number => {
	const date1 =
		p1.updatedAt !== undefined
			? p1.updatedAt
			: p1.publishedAt !== undefined
			? p1.publishedAt
			: p1.createdAt

	const date2 =
		p2.updatedAt !== undefined
			? p2.updatedAt
			: p2.publishedAt !== undefined
			? p2.publishedAt
			: p2.createdAt

	return date1.getTime() > date2.getTime() ? 1 : -1
}
export const isDraft = (post: Post): boolean => post.data.draft
export const isFeatured = (post: Post): boolean => post.data.featured
export const isPublished = (post: Post): boolean =>
	typeof post.data.publishedAt !== 'undefined' && !post.data.draft
export const isPublishedAndNotArchived = (post: Post): boolean =>
	typeof post.data.publishedAt !== 'undefined' &&
	!post.data.archived &&
	!post.data.draft

export function getRelatedPosts(
	currentPost: Pick<Post, 'data' | 'slug'>,
	posts: Post[],
	quantity = 3
): Post[] {
	let relatedPosts: Post[] = []

	if (typeof currentPost.data.tags !== 'undefined') {
		// Find related posts
		relatedPosts = posts
			.filter(({ data: { tags } }) => {
				if (typeof tags !== 'undefined') {
					return tags.some(tag => currentPost.data.tags?.includes(tag))
				}

				return false
			})
			// Remove the current post from the list of related posts
			.filter(p => p.slug !== currentPost.slug)
	}

	// Return an array of related posts with a maximum length of `quantity`
	return relatedPosts.length > quantity
		? relatedPosts.slice(0, quantity)
		: relatedPosts
}
