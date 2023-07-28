import Button from '@ui/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

/**
 * Custom404 component is the 404 error page in case of navigating to a route that does not exist.
 *
 * @component
 * @example
 * return (
 *   <Custom404 />
 * )
 */

export default function Custom404() {
	const router = useRouter()

	// const handleBack = useCallback(() => {
	// 	router.back()
	// }, [router])

	return (
		<div className="min-h-screen grid place-content-center place-items-center justify-center gap-12">
			<main className="flex flex-col items-center gap-12">
				<header className="flex flex-col items-center gap-6">
					<h1 className="text-xxl2">404</h1>
					<h2 className="text-xxl">Lost in the Stars</h2>
				</header>
				<div className="flex flex-col items-center gap-2 text-base text-color-text-dimmed">
					<p>
						Even in the darkest night, a single star can guide the
						way.
					</p>
					<p>
						That&apos;s the power of a creative spark, illuminating
						paths unknown.
					</p>
				</div>
			</main>
			<Link href={'/'}>
				<Button
					label="Fly Back to Nest"
					intent="primary"
					size="default"
					onClick={function (): void {
						//throw new Error('Function not implemented.')
					}}
				>
					{/* <HiOutlineXMark className="h-5 w-5" /> */}
				</Button>
			</Link>
		</div>
	)
}
