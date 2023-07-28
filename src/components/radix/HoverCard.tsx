import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import cx from 'classnames'
import Button from '@ui/Button'
import Avatar from '@rd/Avatar'
import UserCard from '@ui/UserCard'
import AvatarShape from '@ui/AvatarShape'
import useUser from 'src/hooks/useUser'
import useCurrentUser from 'src/hooks/useCurrentUser'
import { v4 as uuidv4 } from 'uuid'
import UserPanel from '@ui/user/UserPanel'
import useEditModal from 'src/hooks/useEditModal'
import useFollow from 'src/hooks/useFollow'
import React, { useCallback } from 'react'
import router from 'next/router'

interface Props {
	userId: string
	size?: number
}

const HoverCardDemo = ({ userId, size = 48 }: Props) => {
	const { data: currentUser } = useCurrentUser()
	const { data: fetchedUser } = useUser(userId)

	const editModal = useEditModal()

	const { isFollowing, toggleFollow } = useFollow(userId)

	const [isHovered, setIsHovered] = React.useState(false)

	const goToUser = useCallback(() => {
		if (fetchedUser) {
			router.push(`/${fetchedUser.username}`)
		}
	}, [router, fetchedUser?.username])

	return (
		<HoverCardPrimitive.Root>
			<HoverCardPrimitive.Trigger asChild>
				<div
					className="ImageTrigger"
					onClick={(e) => {
						e.stopPropagation()
						goToUser()
					}}
					// target="_blank"
					// rel="noreferrer noopener"
				>
					<UserPanel type="small" userId={fetchedUser?.username} />
				</div>
			</HoverCardPrimitive.Trigger>
			<HoverCardPrimitive.Portal>
				<HoverCardPrimitive.Content
					align="center"
					sideOffset={8}
					className={cx(
						'HoverCardPrimitiveContent radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
						'w-80 rounded-[1rem] p-6',
						'bg-color-primary-dark shadow-xl',
						'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
					)}
				>
					<div className="w-full flex flex-col gap-y-2">
						<div className="flex justify-between items-start">
							<AvatarShape
								src={
									fetchedUser?.profileImage ||
									'/images/placeholder.png'
								}
								size={size}
								shape={fetchedUser?.avatarShape}
								uuid={uuidv4()}
							/>
							{/* <UserPanel
								type="small"
								userId={fetchedUser.username}
							/> */}
							{currentUser?.username === userId ? (
								<Button
									intent="outline"
									size="micro"
									label="Edit"
									onClick={editModal.onOpen}
								/>
							) : (
								<Button
									//onMouseEnter={() => setIsHovered(true)}
									//onMouseLeave={() => setIsHovered(false)}
									onClick={toggleFollow}
									size="micro"
									intent={
										isHovered && isFollowing
											? 'danger'
											: isFollowing
											? 'secondary'
											: 'outline'
									}
									label={
										isHovered && isFollowing
											? 'Unfollow'
											: isFollowing
											? 'Following'
											: 'Follow'
									}
									isFollowing={!isFollowing}
								/>
							)}
						</div>
						<UserCard
							name={fetchedUser?.displayName}
							username={fetchedUser?.username}
							description={fetchedUser?.bio}
							following={fetchedUser?.followingCount}
							followers={fetchedUser?.followersCount}
						/>
					</div>
				</HoverCardPrimitive.Content>
			</HoverCardPrimitive.Portal>
		</HoverCardPrimitive.Root>
	)
}

export default HoverCardDemo
