import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useCallback, useState } from 'react'
import useUser from 'src/hooks/useUser'
import { v4 as uuidv4 } from 'uuid'

import UserInfo from './UserInfo'
import AvatarShape from '../AvatarShape'
import { cva } from 'class-variance-authority'
import classNames from 'classnames'

interface Props {
	userId: string
	intent?: 'primary' | 'secondary' | 'accent'
	type?: 'small' | 'default' | 'large'
	size?: 48 | 56 | 76
}

const Styles = cva('flex items-center', {
	variants: {
		type: {
			small: 'gap-4',
			default: 'gap-4',
			large: 'gap-6',
		},
	},
})

const UserPanel: React.FC<Props> = ({
	userId,
	intent = 'primary',
	type = 'default',
	size = 56,
}) => {
	type === 'large' ? (size = 76) : ''
	type === 'small' ? (size = 48) : ''

	const Class = classNames(Styles({ type }))

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
			<AvatarShape
				src={fetchedUser?.profileImage || '/images/placeholder.png'}
				size={size}
				shape={fetchedUser?.avatarShape}
				uuid={uuidv4()}
			/>
			<UserInfo
				size={type}
				intent={intent}
				userId={fetchedUser?.username}
			/>
		</div>
	)
}

export default UserPanel
