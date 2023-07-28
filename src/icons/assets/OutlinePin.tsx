import React from 'react'
import { IconProps } from '../IconProps'

export const OutlinePin: React.FC<IconProps> = ({ className, size }) => (
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
			d="M12 15c.552 0 1 .392 1 .875v5.25c0 .483-.448.875-1 .875s-1-.392-1-.875v-5.25c0-.483.448-.875 1-.875Z"
			fill="currentColor"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M7 5.5A3.5 3.5 0 0 1 10.5 2h3A3.5 3.5 0 0 1 17 5.5v4.175a1 1 0 0 0 .051.317l.8 2.401c.756 2.267-.93 4.607-3.32 4.607H9.468c-2.388 0-4.075-2.34-3.32-4.607l.8-2.401A1 1 0 0 0 7 9.675V5.5ZM10.5 4A1.5 1.5 0 0 0 9 5.5v4.175a3 3 0 0 1-.154.95l-.8 2.4A1.5 1.5 0 0 0 9.468 15h5.062a1.5 1.5 0 0 0 1.423-1.974l-.8-2.402A2.999 2.999 0 0 1 15 9.675V5.5A1.5 1.5 0 0 0 13.5 4h-3Z"
			fill="currentColor"
		/>
	</svg>
)
