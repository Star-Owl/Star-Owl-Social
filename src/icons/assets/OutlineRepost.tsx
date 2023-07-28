import React from 'react'
import { IconProps } from '../IconProps'

export const OutlineRepost: React.FC<IconProps> = ({
	size = 24,
	className,
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12 5a1 1 0 0 0 1 1h2a2 2 0 0 1 2 2v10a1 1 0 1 0 2 0V8a4 4 0 0 0-4-4h-2a1 1 0 0 0-1 1Z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.293 18.707a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L18 16.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3ZM6 5a1 1 0 0 0-1 1v10a4 4 0 0 0 4 4h2a1 1 0 1 0 0-2H9a2 2 0 0 1-2-2V6a1 1 0 0 0-1-1Z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M6.707 5.293a1 1 0 0 0-1.414 0l-3 3a1 1 0 0 0 1.414 1.414L6 7.414l2.293 2.293a1 1 0 0 0 1.414-1.414l-3-3Z"
		/>
	</svg>
)
