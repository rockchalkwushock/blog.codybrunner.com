type L =
	| 'astro'
	| 'copyright'
	| 'github'
	| 'instagram'
	| 'linkedin'
	| 'mdx'
	| 'meet'
	| 'tailwindcss'
	| 'twitter'

type R =
	| `archive`
	| `blog`
	| `bookshelf`
	| `home`
	| `portfolio`
	| `resume`
	| `rss`
	| `uses`

type Links = Record<L, string>
type Routes = Record<R, string>

export const PAGE_SIZE = 10
const SITE_DOMAIN = `https://codybrunner.com`

export const ROUTES: Routes = {
	archive: `/archive`,
	blog: `/`,
	bookshelf: `${SITE_DOMAIN}/bookshelf`,
	home: SITE_DOMAIN,
	portfolio: `${SITE_DOMAIN}/portfolio`,
	resume: `${SITE_DOMAIN}/resume.pdf`,
	rss: `/rss.xml`,
	uses: `${SITE_DOMAIN}/uses`,
}

export const LINKS: Links = {
	astro: `https://astro.build`,
	copyright: `http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1`,
	github: `https://github.com/rockchalkwushock`,
	instagram: `https://www.instagram.com/rockchalkwushock`,
	linkedin: `https://www.linkedin.com/in/cody-brunner`,
	mdx: `https://mdxjs.com`,
	meet: `https://appt.link/cody-brunner-dev/video-call/`,
	tailwindcss: `https://tailwindcss.com`,
	twitter: `https://twitter.com/RockChalkDev`,
}
