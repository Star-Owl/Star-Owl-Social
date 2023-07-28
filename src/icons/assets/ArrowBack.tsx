import React from 'react'
import { IconProps } from '../IconProps'

export const ArrowBack: React.FC<IconProps> = ({ className, size }) => (
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
			d="M22 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h18a1 1 0 0 1 1 1Z"
			fill="currentColor"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2.293 12.707a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 1.414L4.414 12l4.293 4.293a1 1 0 1 1-1.414 1.414l-5-5Z"
			fill="currentColor"
		/>
	</svg>
)
