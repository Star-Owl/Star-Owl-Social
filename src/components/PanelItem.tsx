import Avatar from '@rd/Avatar'
import Button from '@ui/Button_old'

interface Props {
	name: string
	username: string
	src: string
	initials: string
}

const PanelItem = ({ name, username, src, initials }: Props) => (
	<div className="flex flex-1 items-center gap-x-2 px-4 py-3 hover:bg-slate-200">
		<div className="flex items-center gap-x-2 flex-1">
			<div className="flex flex-1 flex-none justify-start">
				<Avatar src={src} alt={name} initials={initials} />
			</div>
			<div className="flex flex-col">
				<p className="text-base font-semibold">{name}</p>
				<p className="text-sm text-slate-600 font-medium">
					@{username}
				</p>
			</div>
		</div>
		<div className="">
			<Button size="small" rounded="small">
				Follow
			</Button>
		</div>
	</div>
)

export default PanelItem
