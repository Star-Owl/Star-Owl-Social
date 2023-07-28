import { useRouter } from 'next/router'
import Logo from 'src/icons/assets/Logo'

const SidebarLogo = () => {
	const router = useRouter()

	return (
		<div
			onClick={() => router.push('/home')}
			className="
                mb-6
                flex
                items-center
                justify-center
                cursor-pointer
            "
		>
			<Logo size={64} color="white" />
		</div>
	)
}

export default SidebarLogo
