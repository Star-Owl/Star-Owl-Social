import { Logo } from 'src/icons/Icons'

const Header = ({ title }: { title: string }) => (
	<header className="sticky bg-color-primary-badge-opacity z-10 backdrop-blur-md top-0 rounded-b-[1rem]">
		<div className="flex items-center justify-between px-6 py-7">
			<div className="flex items-center gap-6">
				<h2 className="text-lg font-bold">{title}</h2>
			</div>
			{/* <Logo size={64} color="white" />
			<div className="flex items-center gap-6">
				<h2 className="text-lg font-bold">{title}</h2>
			</div> */}
		</div>
	</header>
)

export default Header
