import React from 'react'
import { IconProps } from '../IconProps'

export const OutlineBell: React.FC<IconProps> = ({ className, size }) => (
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
			d="M10 20h4a2 2 0 1 1-4 0Z"
			fill="currentColor"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12 2a1 1 0 0 0-1 1v1c0 .028 0 .055.003.082A6.002 6.002 0 0 0 6 10v1.957c0 .431-.156.847-.44 1.172l-.644.74C2.83 16.261 4.53 20 7.706 20h8.588c3.175 0 4.876-3.738 2.789-6.132l-.644-.74a1.783 1.783 0 0 1-.44-1.17V10a6.002 6.002 0 0 0-5.003-5.918A1.02 1.02 0 0 0 13 4V3a1 1 0 0 0-1-1Zm-4 8a4 4 0 0 1 8 0v1.957c0 .914.33 1.797.93 2.486l.645.74c.96 1.1.178 2.817-1.281 2.817H7.706c-1.46 0-2.241-1.718-1.282-2.818l.644-.739c.6-.689.932-1.572.932-2.486V10Z"
			fill="currentColor"
		/>
	</svg>
)
