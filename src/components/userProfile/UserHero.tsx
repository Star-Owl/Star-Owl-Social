import Image from 'next/image'
import { format } from 'date-fns'

import React, {
	useMemo,
	forwardRef,
	useRef,
	useState,
	useEffect,
	useContext,
} from 'react'

import useUser from 'src/hooks/useUser'
import useCurrentUser from 'src/hooks/useCurrentUser'
import useFollow from 'src/hooks/useFollow'
import useEditModal from 'src/hooks/useEditModal'
//import useIntersectionObserver from 'src/hooks/useIntersectionObserver'

import { useStickyContext } from 'src/contexts/StickyContent'

//import UserPanel from '../user/UserPanel'

import Button from '../Button'
import HeaderProfile from '@ui/HeaderProfile'
import UserPanel from '@ui/user/UserPanel'

interface Props {
	userId: string
}

const UserHero: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
	{ userId },
	ref,
) => {
	const { data: currentUser } = useCurrentUser()
	const { data: fetchedUser } = useUser(userId)

	const editModal = useEditModal()

	const { isFollowing, toggleFollow } = useFollow(userId)

	const createdAt = useMemo(() => {
		if (!fetchedUser?.createdAt) {
			return null
		}

		return format(new Date(fetchedUser.createdAt), 'MMMM yyyy')
	}, [fetchedUser?.createdAt])

	const { setShouldReserveSpace } = useStickyContext()

	//const isIntersecting = useIntersectionObserver(panelRef)

	const [headerWidth, setHeaderWidth] = useState(0)

	// useEffect(() => {
	// 	const updateWidth = () => {
	// 		if (panelRef.current) {
	// 			setHeaderWidth(panelRef.current.offsetWidth)
	// 		}
	// 	}

	// 	window.addEventListener('resize', updateWidth)
	// 	// Initial update
	// 	updateWidth()
	// 	// Cleanup function
	// 	return () => window.removeEventListener('resize', updateWidth)
	// }, [panelRef])

	// useEffect(() => {
	// 	if (!isIntersecting) {
	// 		setShouldReserveSpace(true)
	// 	} else {
	// 		setShouldReserveSpace(false)
	// 	}
	// }, [isIntersecting])

	const [isHovered, setIsHovered] = React.useState(false)

	return (
		<div ref={ref} className="mt-12 flex flex-col">
			<div
				className="
                h-full
                relative
                rounded-[1rem]
                bg-gradient-to-tr from-color-accent to-color-accent-lighter"
			>
				<div className="absolute w-full h-full bg-gradient-to-t from-color-overlay-dead to-color-overlay-subtle pointer-events-none">
					{fetchedUser?.coverImage && (
						<Image
							src={fetchedUser.coverImage}
							fill
							alt="Cover Image"
							style={{ objectFit: 'cover' }}
						/>
					)}
				</div>
				<div className="w-full h-full flex flex-col z-100">
					<HeaderProfile showBackArrow />
					<div className="mx-6 mb-6 my-4 flex flex-col gap-6">
						<div className="flex items-center gap-6">
							<UserPanel
								intent="secondary"
								type="large"
								userId={fetchedUser?.username}
							/>
						</div>
						<div className="flex justify-between items-center">
							<div className="flex flex-row items-center mt-4 gap-6">
								<div className="flex flex-col items-start gap-2">
									<p className="text-lg font-semibold">
										{fetchedUser?.followingCount}
									</p>
									<p className="text-lg text-color-text-dimmed">
										Following
									</p>
								</div>
								<div className="flex flex-col items-start gap-2">
									<p className="text-lg font-semibold">
										{fetchedUser?.followersCount}
									</p>
									<p className="text-lg text-color-text-dimmed">
										Followers
									</p>
								</div>
							</div>
							<div>
								{currentUser?.username === userId ? (
									<Button
										intent="outline"
										size="small"
										label="Edit"
										disabled
										onClick={editModal.onOpen}
									/>
								) : (
									<Button
										//onMouseEnter={() => setIsHovered(true)}
										//onMouseLeave={() => setIsHovered(false)}
										onClick={toggleFollow}
										size="small"
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
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(UserHero)
