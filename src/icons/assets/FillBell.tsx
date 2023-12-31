import React from 'react'
import { IconProps } from '../IconProps'

export const FillBell: React.FC<IconProps> = ({ className, size }) => (
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
			d="M10.062 20.495c-.068-.268.162-.495.438-.495h3c.276 0 .507.227.438.495a2 2 0 0 1-3.876 0ZM13.004 4h-2.009l-1.031.371A5.992 5.992 0 0 0 6 10.01v1.326c0 .734-.345 1.425-.932 1.866C3.021 14.741 4.11 18 6.671 18h10.657c2.562 0 3.65-3.26 1.603-4.799A2.334 2.334 0 0 1 18 11.335V10.01a5.992 5.992 0 0 0-3.964-5.638L13.004 4ZM11 3a1 1 0 1 1 2 0v1h-2V3Z"
			fill="currentColor"
		/>
	</svg>
)
