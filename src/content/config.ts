import { articlesCollection, type Article } from './articles'
import { authorsCollection, type Author } from './authors'

export const collections = {
	articles: articlesCollection,
	authors: authorsCollection,
}

export type { Article, Author }
