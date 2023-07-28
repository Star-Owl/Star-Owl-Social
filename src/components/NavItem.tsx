import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
	active?: boolean
	href: string
	width: 'full' | 'inline'
	size: 'default' | 'drowDown'
	children: ReactNode
	onClick?: () => void
}

const NavItemStyles = cva(
	`
		items-center
		gap-x-4
		leading-6
		transition
		xl:justify-start
		sm:flex
	`,
	{
		variants: {
			width: {
				full: 'w-full',
				inline: 'max-w-fit', // max-w-fit Twitter not full width effect
			},
			size: {
				default: 'rounded-[.875rem] py-3 px-4',
				drowDown: 'rounded-[.875rem] py-4 px-4',
			},
			active: {
				true: 'bg-color-accent-subtle text-color-accent opacity-100',
				false: 'hover:bg-color-text-dead hover:opacity-100 opacity-[.48]',
			},
		},
		defaultVariants: {
			width: 'inline',
			size: 'default',
		},
	},
)

const NavItem = ({
	active = false,
	href,
	children,
	width,
	size,
	onClick,
}: Props) => (
	<Link
		onClick={onClick}
		className={NavItemStyles({
			active,
			width,
			size,
		})}
		href={href}
	>
		{children}
	</Link>
)

export default NavItem
