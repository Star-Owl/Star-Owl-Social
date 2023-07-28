import React from 'react'
import { IconProps } from '../IconProps'

export const OutlineEdit: React.FC<IconProps> = ({ className, size }) => (
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
			d="M4 21a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
			fill="currentColor"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12.412 3.174a4 4 0 0 1 5.657 0l.757.758a4 4 0 0 1 0 5.656l-6.906 6.906a1.99 1.99 0 0 1-1.015.546l-4.503.918a2 2 0 0 1-2.36-2.36l.918-4.503a2 2 0 0 1 .546-1.015l6.906-6.906Zm4.242 1.414a2 2 0 0 0-2.828 0L13.414 5 17 8.586l.412-.412a2 2 0 0 0 0-2.828l-.758-.758ZM8.414 10 12 6.414 15.586 10 12 13.586 8.414 10ZM7 11.414l-.08.08-.918 4.504 4.504-.918.08-.08L7 11.414Z"
			fill="currentColor"
		/>
	</svg>
)
