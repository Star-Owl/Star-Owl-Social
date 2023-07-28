import Avatar from '@rd/Avatar'
import Link from 'next/link'
import Twemoji from 'react-twemoji'

import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2'
import UserPanel from './user/UserPanel'
import useCurrentUser from 'src/hooks/useCurrentUser'

const AccountNavItem = () => {
	const { data: currentUser, isLoading } = useCurrentUser()
	return (
		<a
			href={currentUser?.username}
			className="flex flex-1 items-center gap-x-2 px-6 py-3 rounded-none bg-color-primary-lighter transition xl:rounded-[1rem] cursor-pointer"
		>
			<div className="flex items-center gap-x-3 flex-1 truncate">
				<UserPanel type="small" userId={currentUser?.username} />
			</div>
		</a>
	)
}

export default AccountNavItem
