import React from 'react'
import { IconProps } from '../IconProps'

export const FillStar: React.FC<IconProps> = ({ className, size }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<path
			d="M10.609 2.938c.505-1.251 2.277-1.251 2.782 0l1.937 4.802a.5.5 0 0 0 .423.312l4.867.397c1.319.107 1.862 1.747.868 2.621l-3.692 3.248a.5.5 0 0 0-.158.483l1.18 5.367c.295 1.34-1.216 2.34-2.335 1.544l-4.191-2.984a.5.5 0 0 0-.58 0l-4.191 2.984c-1.119.796-2.63-.203-2.335-1.544l1.18-5.367a.5.5 0 0 0-.158-.483L2.514 11.07c-.994-.874-.451-2.514.868-2.621l4.867-.397a.5.5 0 0 0 .423-.312l1.937-4.802Z"
			fill="currentColor"
		/>
	</svg>
)
