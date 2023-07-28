import { ReactNode, useState, useEffect } from 'react'
import DialogDemo from '@rd/Dialog'
import NavItem from '@ui/NavItem'
import AccountNavItem from '@ui/AccountNavItem'
import SidebarLogo from './layout/SidebarLogo'

import useCurrentUser from 'src/hooks/useCurrentUser'

import {
	OutlineHome,
	FillHome,
	OutlineSearch,
	FillSearch,
	OutlineBell,
	FillBell,
	OutlineMessage,
	FillMessage,
	OutlineBookmark,
	FillBookmark,
	OutlineSettings,
	FillSettings,
} from 'src/icons/Icons'
import toast from 'react-hot-toast'
import { signOut } from 'next-auth/react'
import UserPanel from './user/UserPanel'

interface NavLinkItem {
	active: boolean
	href: string
	text: string
	icon?: ReactNode
	isLogout?: boolean
}

function Nav() {
	const [clicked, setClicked] = useState(false)

	const { data: currentUser } = useCurrentUser()

	useEffect(() => {
		if (clicked) {
			console.log('Button clicked!')
		}
	}, [clicked])

	const items: NavLinkItem[] = [
		{
			active: true,
			href: '/home',
			text: 'Nest',
			icon: null,
		},
		{
			active: false,
			href: '/explore',
			text: 'Explore',
			icon: null,
		},
		...(currentUser
			? [
					{
						active: false,
						href: '/notifications',
						text: 'Echoes',
						icon: null,
					},
					{
						active: false,
						href: '/messages',
						text: 'Chatter',
						icon: null,
					},
					{
						active: false,
						href: '/bookmarks',
						text: 'StarMark',
						icon: null,
					},
			  ]
			: []),
		{
			active: false,
			href: '/settings',
			text: 'Tweak',
			icon: null,
		},
		...(currentUser
			? [
					{
						active: false,
						href: '',
						text: 'Logout',
						icon: null,
						isLogout: true,
					},
			  ]
			: []),
	]

	const activeIcons = {
		'/home': <FillHome className="w-8" />,
		'/explore': <FillSearch className="w-8" />,
		'/notifications': <FillBell className="w-8" />,
		'/messages': <FillMessage className="w-8" />,
		'/bookmarks': <FillBookmark className="w-8" />,
		'/settings': <FillSettings className="w-8" />,
	}

	const inactiveIcons = {
		'/home': <OutlineHome className="w-8" />,
		'/explore': <OutlineSearch className="w-8" />,
		'/notifications': <OutlineBell className="w-8" />,
		'/messages': <OutlineMessage className="w-8" />,
		'/bookmarks': <OutlineBookmark className="w-8" />,
		'/settings': <OutlineSettings className="w-8" />,
	}

	return (
		<header
			className="
			hidden
			justify-end
			sm:flex
			sm:w-1/6
			sm:col-span-2
			lg:col-span-3
			xl:w-full"
		>
			<div
				className="
				flex
				flex-col
				fixed
				h-full
				py-12
				items-end
				sm:w-[6rem]
				xl:w-full"
			>
				<div
					className="
					flex
					flex-col
					flex-1
					items-center
					w-full
					rounded-[1rem]
					xl:items-start
					xl:w-[300px]"
				>
					{/* <SidebarLogo /> */}
					<nav className="flex flex-col gap-2 w-full rounded-[1rem] overflow-hidden items-center xl:items-start">
						{/* bg-color-primary-lighter py-6 px-4 */}
						{items.map(({ active, href, text, isLogout }, i) => (
							<div key={`header-${i}`}>
								<NavItem
									active={active}
									href={href}
									width="inline"
									size="default"
									onClick={
										isLogout ? () => signOut() : undefined
									}
								>
									{active
										? activeIcons[
												href as keyof typeof activeIcons
										  ]
										: inactiveIcons[
												href as keyof typeof inactiveIcons
										  ]}
									<div
										className={`
										hidden
										xl:inline-flex
										flex-none
										text-lg
										${active ? 'font-bold' : 'font-medium'}
									`}
									>
										{text}
									</div>
								</NavItem>
							</div>
						))}
					</nav>
					<DialogDemo />
					{/* {currentUser && <DialogDemo />} */}
				</div>
				{currentUser ? (
					<div className="w-[300px]">
						{/* <UserPanel type="default" userId={currentUser?.username} /> */}
						<AccountNavItem />
					</div>
				) : (
					<div></div>
				)}
			</div>
		</header>
	)
}

export default Nav
