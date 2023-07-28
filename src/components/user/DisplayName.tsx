import { cva } from 'class-variance-authority'
import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useCallback, useState } from 'react'
import Twemoji from 'react-twemoji'
import useUser from 'src/hooks/useUser'

interface Props {
	userId: string
	size?: 'small' | 'default' | 'large'
}

const Styles = cva('font-bold', {
	variants: {
		size: {
			small: 'text-base',
			default: 'text-xl',
			large: 'text-xxl',
		},
	},
})

const DisplayName: React.FC<Props> = ({ userId, size = 'default' }) => {
	const Class = classNames(Styles({ size }))
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
		<h1 className={`${Class}`}>
			<Twemoji options={{ className: 'emoji' }}>
				{fetchedUser ? fetchedUser?.displayName : 'User'}
			</Twemoji>
		</h1>
	)
}

export default DisplayName
