import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Article, CategoryEnum, TagsEnum } from '~/content/config'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Article Helpers

export function filterArticles(
	articles: Articles,
	callback: (article: Article) => boolean
): Articles {
	return articles.filter(callback)
}

export function sortArticles(
	articles: Articles,
	callback: (a: Article, b: Article) => number
): Articles {
	return articles.sort(callback)
}

export function isAfter({ data: a1 }: Article, { data: a2 }: Article): number {
	const date1 =
		a1.updatedAt !== undefined
			? a1.updatedAt
			: a1.publishedAt !== undefined
			? a1.publishedAt
			: a1.createdAt

	const date2 =
		a2.updatedAt !== undefined
			? a2.updatedAt
			: a2.publishedAt !== undefined
			? a2.publishedAt
			: a2.createdAt

	return date1.getTime() < date2.getTime() ? 1 : -1
}

export function isArchived(article: Article): boolean {
	return article.data.archived
}

export function isDraft(article: Article): boolean {
	return article.data.draft
}

export function isBefore({ data: a1 }: Article, { data: a2 }: Article): number {
	const date1 =
		a1.updatedAt !== undefined
			? a1.updatedAt
			: a1.publishedAt !== undefined
			? a1.publishedAt
			: a1.createdAt

	const date2 =
		a2.updatedAt !== undefined
			? a2.updatedAt
			: a2.publishedAt !== undefined
			? a2.publishedAt
			: a2.createdAt

	return date1.getTime() > date2.getTime() ? 1 : -1
}

export function isPublished(article: Article): boolean {
	return article.data.publishedAt !== undefined && !isDraft(article)
}

export function isPublishedAndNotArchived(article: Article): boolean {
	return isPublished(article) && !isArchived(article)
}

export function getCategoryCount(
	articles: Articles,
	category: CategoryEnum
): number {
	return filterArticles(articles, article => hasCategory(article, category))
		.length
}

export function hasCategory(article: Article, category: CategoryEnum): boolean {
	return typeof article.data.categories !== 'undefined'
		? article.data.categories.includes(category)
		: false
}

export function getTagCount(articles: Articles, tag: TagsEnum): number {
	return filterArticles(articles, article => hasTag(article, tag)).length
}

export function hasTag(article: Article, tag: TagsEnum): boolean {
	return typeof article.data.tags !== 'undefined'
		? article.data.tags.includes(tag)
		: false
}
