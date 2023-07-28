import React from 'react'
import { IconProps } from '../IconProps'

export const Close: React.FC<IconProps> = ({ className, size }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.656 6.343a1 1 0 0 0-1.414 0L12 10.586 7.757 6.343a1 1 0 0 0-1.414 1.415L10.585 12l-4.242 4.242a1 1 0 1 0 1.414 1.414l4.242-4.242 4.243 4.243a1 1 0 0 0 1.414-1.414L13.413 12l4.243-4.243a1 1 0 0 0 0-1.414Z"
			fill="currentColor"
		/>
	</svg>
)
