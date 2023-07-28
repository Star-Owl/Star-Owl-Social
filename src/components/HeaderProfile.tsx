import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { ArrowBack } from 'src/icons/Icons'

interface HeaderProps {
	showBackArrow?: boolean
	label?: string
}

const HeaderProfile: React.FC<HeaderProps> = ({ showBackArrow }) => {
	const router = useRouter()

	const handleBack = useCallback(() => {
		router.back()
	}, [router])

	return (
		<div className="px-6 pb-4 pt-6">
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
					{showBackArrow && <ArrowBack color="white" size={32} />}
				</div>
			</div>
		</div>
	)
}

export default HeaderProfile
