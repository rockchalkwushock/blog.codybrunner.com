export const toCapitalize = (str: string): string =>
	str.charAt(0).toUpperCase() + str.slice(1)

export const capitalizeJS = (str: string): string => str.replace('js', 'JS')

const oddBalls = ['asd', 'cli', 'dns', 'psql', 'ssh', 'zsh']
export const parseOddBalls = (str: string): string => {
	if (str === 'ci-cd') return str.toUpperCase().replace('-', '/')
	if (str === 'graphql') return str.replace('ql', 'QL')
	if (str === 'javascript' || str === 'typescript') return str.replace('s', 'S')
	if (str === 'macos') return str.replace('os', 'OS')
	if (str === 'tailwindcss') return str.replace('css', 'CSS')
	if (str === 'vscode') return str.replace('sc', 'SC')
	if (oddBalls.includes(str)) return str.toUpperCase()
	return str
}
