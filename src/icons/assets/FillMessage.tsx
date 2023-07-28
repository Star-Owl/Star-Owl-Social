import React from 'react'
import { IconProps } from '../IconProps'

export const FillMessage: React.FC<IconProps> = ({ size, className }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M3 17.275V9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v1.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 17 16.84 17 14.6 17h-4.24c-.502 0-.753 0-.988.058a2 2 0 0 0-.589.25c-.205.13-.379.31-.727.67l-.929.963c-1.29 1.337-1.935 2.006-2.49 2.056a1.5 1.5 0 0 1-1.272-.513C3 20.062 3 19.133 3 17.274Z"
			fill="currentColor"
		/>
	</svg>
)
