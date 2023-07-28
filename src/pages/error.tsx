import { useRouter } from 'next/router'

function ErrorPage() {
	const { query } = useRouter()
	const { error } = query

	return (
		<div className="min-h-screen grid place-content-center place-items-center justify-center gap-6">
			<h1 className="text-2xl font-bold">An error occurred</h1>
			<code className="text-lg text-color-text-dimmed">{error}</code>
		</div>
	)
}

export default ErrorPage
