import { useEffect, useState, MutableRefObject } from 'react'

function useIntersectionObserver(
	elementRef: MutableRefObject<HTMLElement | null>,
): boolean {
	const [isIntersecting, setIntersecting] = useState(false)

	useEffect(() => {
		let observer: IntersectionObserver | null = null

		if (elementRef.current) {
			observer = new IntersectionObserver(
				(entries) => {
					const [entry] = entries
					setIntersecting(entry.isIntersecting)
				},
				{
					rootMargin: '0px',
					threshold: 0.1,
				},
			)

			observer.observe(elementRef.current)
		}

		return () => {
			if (elementRef.current && observer) {
				observer.unobserve(elementRef.current)
			}
		}
	}, [elementRef])

	return isIntersecting
}

export default useIntersectionObserver
