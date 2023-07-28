/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/home',
				permanent: true,
			},
		]
	},
	reactStrictMode: true,
	images: {
		domains: ['pbs.twimg.com', 'images.unsplash.com'],
	},
}

module.exports = nextConfig
