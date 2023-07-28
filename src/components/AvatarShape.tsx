import React from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

type Shape = 'circle' | 'square' | 'hexagon'

interface AvatarProps {
	src: string
	size?: number
	shape?: Shape
	uuid: string
}

const BORDER_SIZES = new Map<number, number>([
	[48, 4],
	[56, 6],
	[76, 8],
])

const DEFAULT_BORDER_SIZE = 4
const DEFAULT_COLOR = 'rgba(0, 0, 0, 0.12)'

const AvatarShape: React.FC<AvatarProps> = ({
	src,
	size = 48,
	shape = 'circle',
	uuid,
}) => {
	const borderSize = BORDER_SIZES.get(size) || DEFAULT_BORDER_SIZE
	const viewBoxSize = size

	const maskId = `mask-${uuid}`
	const borderMaskId = `border-mask-${uuid}`

	const commonProps = {
		style: {
			objectFit: 'cover' as const,
			backgroundSize: 'cover',
		},
	}

	const pathData =
		shape === 'hexagon'
			? 'M23.19 9.063a38.354 38.354 0 0 0-3.054-5.29l-.373-.536a5.45 5.45 0 0 0-4.054-2.34l-.655-.052a38.165 38.165 0 0 0-6.108 0L8.29.897a5.451 5.451 0 0 0-4.054 2.34l-.373.541A38.347 38.347 0 0 0 .81 9.068l-.282.592a5.45 5.45 0 0 0 0 4.68l.282.592a38.34 38.34 0 0 0 3.054 5.29l.373.54a5.45 5.45 0 0 0 4.054 2.34l.655.053c2.033.164 4.075.164 6.108 0l.655-.052a5.45 5.45 0 0 0 4.054-2.347l.373-.541a38.346 38.346 0 0 0 3.054-5.29l.282-.592a5.452 5.452 0 0 0 0-4.68l-.282-.59Z'
			: //M12 0H7.567a3.112 3.112 0 0 0-2.713 1.594l-2.208 3.91L.42 9.407a3.225 3.225 0 0 0 0 3.188l2.225 3.901 2.208 3.911A3.112 3.112 0 0 0 7.567 22h8.866a3.113 3.113 0 0 0 2.713-1.594l2.208-3.91 2.225-3.902a3.225 3.225 0 0 0 0-3.188l-2.225-3.901-2.208-3.911A3.112 3.112 0 0 0 16.433 0H12Z
			shape === 'square'
			? 'M0 25C0 11.193 11.193 0 25 0h49.972c13.818 0 25.016 11.21 25 25.028l-.055 50C99.902 88.824 88.713 100 74.917 100H25C11.193 100 0 88.807 0 75V25Z'
			: ' M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z'

	const viewBox = shape === 'square' ? '0 0 100 100' : '0 0 24 24'
	const avatarSize = shape === 'square' ? '100' : '24'
	const rx = shape === 'square' ? viewBoxSize / 4 : 0

	return (
		<div
			style={{
				width: viewBoxSize + 2 * borderSize,
				height: viewBoxSize + 2 * borderSize,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				position: 'relative',
			}}
		>
			<svg
				width={viewBoxSize + 2 * borderSize}
				height={viewBoxSize + 2 * borderSize}
				viewBox={viewBox}
				style={{ position: 'absolute' }}
			>
				<defs>
					<mask id={borderMaskId}>
						<path d={pathData} fill="white" rx={rx} />
					</mask>
				</defs>
				<rect
					width="100%"
					height="100%"
					fill={DEFAULT_COLOR}
					mask={`url(#${borderMaskId})`}
				/>
			</svg>
			<svg
				width={viewBoxSize}
				height={viewBoxSize}
				viewBox={viewBox}
				style={{ position: 'absolute' }}
			>
				<defs>
					<mask id={maskId}>
						<path d={pathData} fill="white" rx={rx} />
					</mask>
				</defs>
				<image
					{...commonProps}
					x="0"
					y="0"
					width={avatarSize}
					height={avatarSize}
					mask={`url(#${maskId})`}
					xlinkHref={src}
				/>
			</svg>
		</div>
	)
}

export default AvatarShape
