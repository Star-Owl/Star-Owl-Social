import React from 'react'
import { IconProps } from '../IconProps'

export const FillHome: React.FC<IconProps> = ({ className, size }) => (
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
			d="M12.681 7.165a1.5 1.5 0 0 0-1.362 0l-5.5 2.805A1.5 1.5 0 0 0 5 11.306V18a3 3 0 0 0 3 3h.86c.63 0 1.14-.51 1.14-1.14V17a2 2 0 1 1 4 0v2.86c0 .63.51 1.14 1.14 1.14H16a3 3 0 0 0 3-3v-6.694a1.5 1.5 0 0 0-.819-1.336l-5.5-2.805Z"
			fill="currentColor"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M3.106 8.447a1 1 0 0 0 1.341.447L12 5.118l7.553 3.776a1 1 0 1 0 .894-1.788l-8-4a1 1 0 0 0-.894 0l-8 4a1 1 0 0 0-.447 1.341Z"
			fill="currentColor"
		/>
	</svg>
)
