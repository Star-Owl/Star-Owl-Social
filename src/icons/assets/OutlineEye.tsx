import React from 'react'
import { IconProps } from '../IconProps'

export const OutlineEye: React.FC<IconProps> = ({ className, size }) => (
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
			d="M12 6c-4.855 0-7.11 3.773-7.903 5.553a1.088 1.088 0 0 0 0 .894C4.89 14.227 7.145 18 12 18c4.855 0 7.11-3.773 7.903-5.553a1.088 1.088 0 0 0 0-.893C19.11 9.772 16.855 6 12 6Zm-9.73 4.74C3.14 8.788 5.89 4 12 4s8.86 4.788 9.73 6.74a3.088 3.088 0 0 1 0 2.52C20.86 15.212 18.109 20 12 20s-8.86-4.788-9.73-6.74a3.088 3.088 0 0 1 0-2.52Z"
			fill="currentColor"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-.085 2.002L12 10a2 2 0 1 1-1.998 1.915A1.5 1.5 0 0 0 12 10.5a1.5 1.5 0 0 0-.085-.498Z"
			fill="currentColor"
		/>
	</svg>
)
