import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import {
	FillStar,
	OutlineStar,
	OutlineMessage,
	OutlineRepost,
	Views,
	OutlineBookmark,
	BookmarkCheck,
	Share,
} from 'src/icons/Icons'
import numeral from 'numeral'
import { formatDistanceToNowStrict } from 'date-fns'

import useLoginModal from 'src/hooks/useLoginModal'
import useCurrentUser from 'src/hooks/useCurrentUser'
import useLike from 'src/hooks/useLike'

import AvatarShape from '../AvatarShape'
interface PostItemProps {
	data: Record<string, any>
	userId?: string
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
	const router = useRouter()
	const loginModal = useLoginModal()

	const { data: currentUser } = useCurrentUser()
	const { hasLiked, toggleLike } = useLike({ postId: data.id, userId })

	function formatNumber(num: number) {
		if (num < 10_000) {
			return numeral(num).format('0,0')
		} else {
			return numeral(num).format('0.0a').toUpperCase()
		}
	}

	function getRandomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const goToUser = useCallback(
		(ev: any) => {
			ev.stopPropagation()
			router.push(`/${data.user.username}`)
		},
		[router, data.user.username],
	)

	const goToPost = useCallback(() => {
		router.push(`/posts/${data.id}`)
	}, [router, data.id])

	const onLike = useCallback(
		async (ev: any) => {
			ev.stopPropagation()

			if (!currentUser) {
				return loginModal.onOpen()
			}

			toggleLike()
		},
		[loginModal, currentUser, toggleLike],
	)

	// const onComment = useCallback(
	// 	async (ev: any) => {
	// 		ev.stopPropagation()

	// 		loginModal.onOpen()
	// 	},
	// 	[loginModal, currentUser],
	// )

	const StarIcon = hasLiked ? FillStar : OutlineStar

	const createdAt = useMemo(() => {
		if (!data?.createdAt) {
			return null
		}

		return formatDistanceToNowStrict(new Date(data.createdAt), {
			addSuffix: true,
		})
	}, [data.createdAt])

	return (
		<div
			onClick={goToPost}
			className="
                p-6
                mb-6
                rounded-[1rem]
                cursor-pointer
                bg-color-primary-lighter
                hover:bg-color-primary-lighter-hover
                transition"
		>
			<div className="flex flex-col items-start gap-4">
				<div className="flex flex-row items-center gap-4">
					<AvatarShape
						size={56}
						shape="square"
						src={
							data.user.profileImage || '/images/placeholder.png'
						}
						uuid={''}
					/>
					<div className="flex flex-col gap-2">
						<p
							onClick={goToUser}
							className="
                                font-bold
                                font-base
                                cursor-pointer
                                hover:underline"
						>
							{data.user.name}
						</p>
						<span
							onClick={goToUser}
							className="
                                text-sm
                                text-color-text-disabled
                                py-[0.25rem]
                                px-[0.5rem]
                                rounded-[0.375rem]
                                bg-color-text-dead
                                cursor-pointer
                                hover:underline
                                hidden
                                md:block"
						>
							@{data.user.username}
						</span>
					</div>
				</div>
				<div className="flex flex-col w-full">
					<div className="text-base">{data.body}</div>
					<div className="flex justify-between mt-4 w-full">
						<div className="flex w-full lg:w-1/2 gap-6">
							<div
								id="Counter"
								className="
                                    w-full
                                    flex-1
                                    flex
                                    items-center"
							>
								<button
									onClick={onLike}
									className="
                                        icon
                                        flex
                                        flex-row
                                        gap-4
                                        cursor-pointer
                                        transition
                                        text-color-text-disabled
                                        hover:text-color-star"
								>
									<StarIcon
										className={
											hasLiked ? 'text-color-star ' : ''
										}
										size={24}
									/>
									<p
										className={
											hasLiked ? 'text-color-star' : ''
										}
									>
										{data.likedIds?.length !== 0
											? formatNumber(
													data.likedIds?.length,
											  )
											: ''}
									</p>
								</button>
							</div>
							<div className="w-full flex-1 flex items-center gap-4">
								{/* <button
									onClick={onComment}
									className="icon cursor-pointer transition text-color-text-disabled hover:text-color-comment"
								>
									<OutlineMessage size={24} />
									<p>
										{data.comments?.length !== 0
											? formatNumber(
													data.comments?.length,
											  )
											: ''}
									</p>
								</button> */}
							</div>
							<div className="w-full flex-1 flex items-center ">
								<button
									className="icon flex flex-row gap-4 cursor-pointer transition hover:text-color-repost text-color-text-disabled disabled:cursor-not-allowed disabled:opacity-50"
									disabled
								>
									<OutlineRepost size={24} />
									<p>
										{formatNumber(
											getRandomNumber(0, 999_999),
										)}
									</p>
								</button>
							</div>
							<div className="w-full flex-1 flex items-center ">
								<button
									className="icon flex flex-row gap-4 cursor-pointer transition hover:text-color-accent text-color-text-disabled disabled:cursor-not-allowed disabled:opacity-50"
									disabled
								>
									<Views className="icon" size={24} />
									<p>
										{formatNumber(
											getRandomNumber(0, 9_999),
										)}
									</p>
								</button>
							</div>
						</div>
					</div>
					<div className="flex flex-row mt-4">
						<span className="text-color-text-disabled text-base">
							{createdAt}
						</span>
						<div className="flex flex-1 flex-row justify-end items-center gap-6">
							<button
								disabled
								className="
                                flex
                                items-center
                                text-color-text
                                gap-4
                                cursor-pointer
                                transition
                                disabled:cursor-not-allowed
                                disabled:opacity-50"
							>
								<OutlineBookmark size={24} />
								<p>Save</p>
							</button>
							<button
								disabled
								className="
                                flex
                                items-center
                                text-color-text
                                gap-4
                                cursor-pointer
                                transition
                                disabled:cursor-not-allowed
                                disabled:opacity-50"
							>
								<Share size={24} />
								<p>Share</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostItem
