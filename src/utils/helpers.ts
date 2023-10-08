import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Article, CategoryEnum, TagsEnum } from '~/content/config'

type Articles = Article[]

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

export function isArchived({ data: article }: Article): boolean {
	return article.archived
}

export function isDraft({ data: article }: Article): boolean {
	return article.draft
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

type ArchivedMap = Record<
	string,
	{
		articles: Articles
		count: number
	}
>

export function createArchivedMap(articles: Articles): ArchivedMap {
	return articles.reduce<ArchivedMap>((acc, article) => {
		const year = new Date(
			article.data.publishedAt ?? article.data.createdAt
		).getFullYear()

		if (!Object.keys(acc).includes(String(year))) {
			acc[year] = {
				count: 1,
				articles: [article],
			}
			return acc
		}

		if (Object.keys(acc).includes(String(year))) {
			acc[year] = {
				count: (acc[year]?.count as number) + 1,
				articles: [...(acc[year]?.articles as Articles), article].sort(
					isBefore
				),
			}
		}

		return acc
	}, {})
}
