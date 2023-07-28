import { useRouter } from 'next/router'
import { useEffect, useRef, useCallback, useState } from 'react'
import { cva } from 'class-variance-authority'
import useUser from 'src/hooks/useUser'
import classNames from 'classnames'

interface Props {
	userId: string
	intent?: 'primary' | 'secondary' | 'accent'
	size?: 'small' | 'default' | 'large'
}

const TagStyles = cva('w-max', {
	variants: {
		intent: {
			primary:
				'bg-color-text-subtle text-color-text-disabled hover:opacity-80',
			secondary: 'bg-color-overlay backdrop-blur[0.75rem]',
			accent: 'bg-color-accent text-color-text hover:opacity-80',
		},
		size: {
			small: 'text-sm py-[.25rem] px-[.5rem] rounded-[0.375rem]',
			default: 'text-base py-[.33rem] px-[.66rem] rounded-[0.375rem]',
			large: 'text-lg py-[.5rem] px-[1rem] rounded-[0.5rem]',
		},
	},
})

const Tag: React.FC<Props> = ({
	userId,
	intent = 'primary',
	size = 'default',
}: Props) => {
	const TagClass = classNames(TagStyles({ intent, size }))
	const router = useRouter()
	const { data: fetchedUser } = useUser(userId)

	// const onClick = useCallback(
	//     (event: any) => {
	//         event.stopPropagation()
	//         const url = `/users/${userId}`
	//         router.push(url)
	//     },
	//     [router, userId]
	// )

	return (
		<span className={`${TagClass}`}>
			@{fetchedUser ? fetchedUser?.username : userId}
		</span>
	)
}

export default Tag
