import React from 'react'
import { IconProps } from '../IconProps'

export const OutlineTrashCan: React.FC<IconProps> = ({ className, size }) => (
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
			d="M7 8v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8h2v10a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8h2Z"
			fill="currentColor"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10 11a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Zm4 0a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Z"
			fill="currentColor"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8 6V5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h3a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2h3Zm2-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4V5Z"
			fill="currentColor"
		/>
	</svg>
)
