import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useCallback, useState } from 'react'
import useUser from 'src/hooks/useUser'

import Tag from './Tag'
import DisplayName from './DisplayName'
import { cva } from 'class-variance-authority'
import classNames from 'classnames'

interface Props {
	userId: string
	intent?: 'primary' | 'secondary' | 'accent'
	size?: 'small' | 'default' | 'large'
}

const Styles = cva('flex flex-col', {
	variants: {
		size: {
			small: 'gap-1.5',
			default: 'gap-1.5',
			large: 'gap-3',
		},
	},
})

const UserInfo: React.FC<Props> = ({
	userId,
	intent = 'primary',
	size = 'default',
}: Props) => {
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
		<div className={`${Class}`}>
			<DisplayName size={size} userId={fetchedUser?.username} />
			<Tag userId={fetchedUser?.username} intent={intent} size={size} />
		</div>
	)
}

export default UserInfo
