module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{css,jsx,png,svg}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};