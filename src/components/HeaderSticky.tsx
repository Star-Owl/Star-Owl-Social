import { useRouter } from 'next/router'
import { useCallback, useContext, createContext } from 'react'
import { ArrowBack } from 'src/icons/Icons'

interface HeaderProps {
	showBackArrow?: boolean
	label: string
	style?: React.CSSProperties
}

const HeaderSticky: React.FC<HeaderProps> = ({
	showBackArrow,
	label,
	style,
}) => {
	const router = useRouter()

	const handleBack = useCallback(() => {
		router.back()
	}, [router])

	return (
		<div
			style={style}
			className="fixed top-0 w-full z-10 backdrop-blur drop-shadow-[0_8px_16px_rgba(22,34,51,0.08)] transition"
		>
			<div className="flex flex-row items-center gap-2 bg-color-primary-badge-opacity h-auto rounded-b-[1rem]">
				<div className="px-6 py-6">
					<div className="flex flex-row items-center gap-4">
						<div
							onClick={handleBack}
							className="
                        p-3.5
                        rounded-[15px]
                        bg-color-overlay
                        backdrop-blur[12px]
                        cursor-pointer
                        transition"
						>
							{showBackArrow && (
								<ArrowBack color="white" size={32} />
							)}
						</div>
					</div>
				</div>
				<h1 className="text-white text-lg font-bold">
					{label} - sticky
				</h1>
			</div>
		</div>
	)
}

export default HeaderSticky
