import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import cx from 'classnames'
import { ReactNode } from 'react'
import NavItem from '@ui/NavItem'

import {
	HiOutlineEllipsisHorizontal,
	HiOutlineFaceFrown,
	HiOutlineUserPlus,
	HiOutlineQueueList,
	HiOutlineSpeakerXMark,
	HiOutlineNoSymbol,
	HiCodeBracket,
	HiOutlineFlag,
} from 'react-icons/hi2'

import {
	OutlineEdit,
	OutlineTrashCan,
	OutlineMessage,
	OutlinePin,
	Views,
	Share,
} from 'src/icons/Icons'

interface AccordionItem {
	href: string
	text: string
	width: 'full' | 'inline' | 'mobile'
	size: 'small' | 'default' | 'large'
	icon?: ReactNode
}

const username = 'Hasiradoo'

const myPost: AccordionItem[] = [
	{
		href: '/',
		text: 'Edit Post',
		width: 'full',
		size: 'small',
		icon: <OutlineEdit className="w-6" />,
	},
	{
		href: '/',
		text: 'Delete Post',
		width: 'full',
		size: 'small',
		icon: <OutlineTrashCan className="w-6" />,
	},
	{
		href: '/',
		text: 'Change who can reply',
		width: 'full',
		size: 'small',
		icon: <OutlineMessage className="w-6" />,
	},
	{
		href: '/',
		text: 'Pin to your profile',
		width: 'full',
		size: 'small',
		icon: <OutlinePin className="w-6" />,
	},
	{
		href: '/',
		text: 'View Post analitics',
		width: 'full',
		size: 'small',
		icon: <Views className="w-6" />,
	},
]

const post: AccordionItem[] = [
	{
		href: '/',
		text: "This Hoot's not helpful",
		width: 'full',
		size: 'small',
		icon: <HiOutlineFaceFrown className="w-6 h-6" />,
	},
	{
		href: '/',
		text: `Follow @${username}`,
		width: 'full',
		size: 'small',
		icon: <HiOutlineUserPlus className="w-6 h-6" />,
	},
	{
		href: '/',
		text: `Mute @${username}`,
		width: 'full',
		size: 'small',
		icon: <HiOutlineSpeakerXMark className="w-6 h-6" />,
	},
	{
		href: '/',
		text: `Block @${username}`,
		width: 'full',
		size: 'small',
		icon: <HiOutlineNoSymbol className="w-6 h-6" />,
	},
	{
		href: '/',
		text: 'Embed Hoot',
		width: 'full',
		size: 'small',
		icon: <HiCodeBracket className="w-6 h-6" />,
	},
	{
		href: '/',
		text: 'Report Hoot',
		width: 'full',
		size: 'small',
		icon: <HiOutlineFlag className="w-6 h-6" />,
	},
]

const DropdownMenuDemo = () => (
	<DropdownMenuPrimitive.Root>
		<DropdownMenuPrimitive.Trigger asChild>
			<button
				className="hover:bg-color-accent-subtle hover:text-color-accent transition rounded-[.875rem] flex justify-center items-center h-12 w-12"
				aria-label="Customize options"
			>
				<HiOutlineEllipsisHorizontal className="h-6 w-6" />
			</button>
		</DropdownMenuPrimitive.Trigger>

		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				sideOffset={0}
				alignOffset={0}
				align="end"
				className={cx(
					'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
					'rounded-[1rem] shadow-2xl w-80 overflow-hidden',
					'bg-color-primary-dark py-4 px-4 gap-2 flex flex-col',
				)}
			>
				{myPost.map(({ href, text, width, size, icon }, i) => (
					<DropdownMenuPrimitive.Item
						key={`header-${i}`}
						// value={`item-${i + 1}`}
						className="focus:outline-none overflow-hidden"
					>
						<NavItem href="{href}" width={'full'} size={'drowDown'}>
							{icon}
							<div className="inline-flex flex-none text-lg">
								{text}
							</div>
						</NavItem>
					</DropdownMenuPrimitive.Item>
				))}
			</DropdownMenuPrimitive.Content>
		</DropdownMenuPrimitive.Portal>
	</DropdownMenuPrimitive.Root>
)

export default DropdownMenuDemo
