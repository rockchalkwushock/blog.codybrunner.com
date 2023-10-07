type Format = 'short' | 'medium' | 'long'

const formatMap: Record<Format, Intl.DateTimeFormatOptions> = {
	short: { day: '2-digit', month: '2-digit', year: 'numeric' },
	medium: { day: 'numeric', month: 'short', year: 'numeric' },
	long: { day: 'numeric', month: 'long', year: 'numeric' },
}

export function formatDate(date: Date, format?: Format): string {
	const { locale } = new Intl.DateTimeFormat().resolvedOptions()
	return new Intl.DateTimeFormat(locale ?? 'en-US', {
		...formatMap[format ?? 'medium'],
		timeZone: 'UTC',
	}).format(date)
}

export function formatToDateTimeString(date: Date): string {
	return new Date(date).getTime().toString()
}

export function toCapitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function capitalizeJS(str: string): string {
	return str.replace(/(js)/g, 'JS')
}

const oddBalls = ['cli', 'ssh']

export function parseOddBalls(str: string): string {
	if (str === 'javascript') return 'JavaScript'
	if (str === 'macos') return 'macOS'
	if (str === 'tailwindcss') return 'TailwindCSS'
	if (str === 'typescript') return 'TypeScript'
	if (oddBalls.includes(str)) return str.toUpperCase()
	return str
}

export function truncate(str: string, limit = 40): string {
	return str.length >= 140
		? str.split(/\W/g).slice(0, limit).join() + '...'
		: str
}
