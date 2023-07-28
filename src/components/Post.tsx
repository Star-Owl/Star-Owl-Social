import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import DropdownMenuDemo from '@rd/DropdownMenu'
import HoverCardDemo from '@rd/HoverCard'
import numeral from 'numeral'
import Twemoji from 'react-twemoji'
//import UserPanel from './user/UserPanel'

import {
	OutlineStar,
	FillStar,
	OutlineMessage,
	OutlineRepost,
	Views,
	OutlineBookmark,
	Share,
} from 'src/icons/Icons'
import UserPanel from './user/UserPanel'
import useUser from 'src/hooks/useUser'
import useCurrentUser from 'src/hooks/useCurrentUser'
import useLike from 'src/hooks/useLike'
import router from 'next/router'
import { format, formatDistanceToNowStrict } from 'date-fns'
import UserInfo from './user/UserInfo'
import Tag from './user/Tag'
import { formatNumber } from 'src/libs/formatNumber'
import { parseBodyText } from 'src/libs/functions/parseText'

interface Props {
	data: Record<string, any>
	userId?: string
}

const Post: React.FC<Props> = ({ data = {}, userId }) => {
	const { data: currentUser } = useCurrentUser()
	const { hasLiked, toggleLike } = useLike({ postId: data.id, userId })

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

			// if (!currentUser) {
			// 	return loginModal.onOpen()
			// }

			toggleLike()
		},
		[currentUser, toggleLike],
	)

	const onComment = useCallback(
		async (ev: any) => {
			ev.stopPropagation()

			// loginModal.onOpen()
		},
		[currentUser],
	)

	const StarIcon = hasLiked ? FillStar : OutlineStar

	const createdAt = useMemo(() => {
		if (!data?.createdAt) return null

		return formatDistanceToNowStrict(new Date(data.createdAt), {
			addSuffix: true,
		})
	}, [data.createdAt])

	const createdAtFull = useMemo(() => {
		if (!data?.createdAt) return null

		return format(new Date(data.createdAt), 'PPpp')
	}, [data.createdAt])

	const [isBottom, setIsBottom] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			const isBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight
			setIsBottom(isBottom)
		}
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<div
			onClick={goToPost}
			className="
				flex
				w-full
				py-6
				bg-color-primary-lighter
				cursor-pointer
				transition
				hover:bg-color-primary-lighter-hover
				md:px-6
				md:rounded-[1rem]"
		>
			<div className="flex flex-col flex-1 w-full">
				<div className="flex place-content-between mb-4 flex-row gap-6 px-6 md:px-0">
					<div
						className="flex flex-col gap-x-1 gap-2"
						onClick={(e) => {
							e.stopPropagation()
							//goToUser(e)
						}}
					>
						<HoverCardDemo size={48} userId={data.user.username} />
					</div>
					<DropdownMenuDemo />
				</div>
				<Twemoji options={{ className: 'emoji' }}>
					<div
						className="
						gap-x-1
						mb-4
						leading-relaxed
						whitespace-pre-wrap
						px-6
						md:px-0"
					>
						{parseBodyText(
							data.body,
							(username) => (
								<a
									href={`/${username}`}
									onClick={(e) => e.stopPropagation()}
								>
									<Tag
										size="small"
										intent="primary"
										userId={username}
									/>
								</a>
							),
							(hashtag) => (
								<a
									className="text-color-accent hover:underline"
									href={`/hashtag/${hashtag}`}
									onClick={(e) => e.stopPropagation()}
								>
									#{hashtag}
								</a>
							),
							(url) => {
								const urlWithScheme = url.startsWith('http')
									? url
									: `https://${url}`
								return (
									<a
										href={urlWithScheme}
										target="_blank"
										rel="noopener noreferrer"
										className="text-color-accent hover:underline"
										onClick={(e) => e.stopPropagation()}
									>
										{url}
									</a>
								)
							},
						).map((part, i) => (
							<span key={i}>{part}</span>
						))}
					</div>
				</Twemoji>
				<div className="flex w-full px-6 py-2 mb-4 md:px-0">
					<ul
						className="
							flex
							gap-6
							text-base
							w-full
							xl:w-3/4
							justify-start
							[&_li>button:first-child]:lg:flex
							[&_li>button]:cursor-pointer
							[&_li>button]:flex
							[&_li>button]:flex-row
							[&_li>button]:items-center
							[&_li>button]:gap-x-4
							[&_li>button:xl]:gap-x-3"
					>
						<li className=" flex flex-1 items-start">
							<button
								onClick={(e) => {
									e.stopPropagation()
									onLike(e)
								}}
								className={
									`icon
									transition
									text-color-text
									opacity-[.48]` +
									(hasLiked ? 'opacity-[1]' : '') +
									`
									hover:opacity-[1]
									hover:text-color-star`
								}
							>
								<StarIcon
									className={
										hasLiked ? 'text-color-star ' : ''
									}
									size={24}
								/>
								<span
									className={
										hasLiked ? '!text-color-star' : ''
									}
								>
									{data.likedIds?.length !== 0
										? formatNumber(data.likedIds?.length)
										: ''}
								</span>
							</button>
						</li>
						<li className="flex flex-1 items-start">
							<button
								onClick={(e) => {
									e.stopPropagation()
									onComment(e)
								}}
								className="
									icon
									transition
									opacity-[.48]
									text-color-text
									hover:opacity-100
									hover:text-color-comment"
							>
								<OutlineMessage size={24} />
								<span>
									{data.comments?.length !== 0
										? formatNumber(data.comments?.length)
										: ''}
								</span>
							</button>
						</li>
						<li className="flex flex-1 items-start">
							<button
								className="
									icon
									transition
									text-color-text
									hover:opacity-100
									hover:text-color-repost
									disabled:cursor-not-allowed
									disabled:opacity-[.12]
									disabled:hover:opacity-[.48]"
								disabled
							>
								<OutlineRepost size={24} />
								<span>
									Disabled
									{/* {formatNumber(getRandomNumber(0, 999_999))} */}
								</span>
							</button>
						</li>
						<li className="flex flex-1 items-start">
							<button
								className="
									icon
									transition
									text-color-text
									hover:opacity-100
									hover:text-color-accent
									disabled:cursor-not-allowed
									disabled:opacity-[.12]
									disabled:hover:opacity-[.48]"
								disabled
							>
								<Views className="icon" size={24} />
								<span>
									Disabled
									{/* {formatNumber(getRandomNumber(0, 9_999))} */}
								</span>
							</button>
						</li>
					</ul>
				</div>
				{/* {children && (
				<div>
					{children}
					<div className="flex w-full px-6 md:px-0">
						<ul
							className="
							flex
							gap-6
							text-sm
							md:text-base
							mb-4
							w-full
							xl:w-3/4
							justify-start
							text-color-text
							opacity-[.48]
							[&_li:first-child]:lg:flex
							[&_li]:flex
							[&_li]:items-center
							[&_li]:gap-x-2
							[&_li:xl]:gap-x-3"
						>
							<li className=" flex flex-1 items-start">
								<OutlineStar className="w-5 md:w-6" />
								{stars !== 0 ? formatNumber(stars) : ''}
							</li>
							<li className="flex flex-1 items-start">
								<OutlineMessage className="w-5 md:w-6" />
								{comments !== 0 ? formatNumber(comments) : ''}
							</li>
							<li className="flex flex-1 items-start">
								<OutlineRepost className="w-5 md:w-6" />
								{rehoots !== 0 ? formatNumber(rehoots) : ''}
							</li>
							<li className="flex flex-1 items-start">
								<Views className="w-5 md:w-6" />
								{views !== 0 ? formatNumber(views) : ''}
							</li>
						</ul>
					</div>
					<Twemoji options={{ className: 'emoji' }}>
						<div className="gap-x-1 mb-4 leading-normal px-6 md:px-0">
							{content}
						</div>
					</Twemoji>
				</div>
			)}
			{!children && (
				<>
					<Twemoji options={{ className: 'emoji' }}>
						<div className="gap-x-1 mb-4 leading-normal px-6 md:px-0">
							{content}
						</div>
					</Twemoji>
					<div className="flex w-full px-6 md:px-0">
						<ul
							className="
							flex
							gap-6
							text-base
							mb-6
							w-full
							xl:w-3/4
							justify-start
							text-color-text
							opacity-[.48]
							[&_li:first-child]:lg:flex
							[&_li]:flex
							[&_li]:items-center
							[&_li]:gap-x-2
							[&_li:xl]:gap-x-3"
						>
							<li className=" flex flex-1 items-start">
								<OutlineStar className="w-6" />
								{stars !== 0 ? formatNumber(stars) : ''}
							</li>
							<li className="flex flex-1 items-start">
								<OutlineMessage className="w-6" />
								{comments !== 0 ? formatNumber(comments) : ''}
							</li>
							<li className="flex flex-1 items-start">
								<OutlineRepost className="w-6" />
								{rehoots !== 0 ? formatNumber(rehoots) : ''}
							</li>
							<li className="flex flex-1 items-start">
								<Views className="w-6" />
								{views !== 0 ? formatNumber(views) : ''}
							</li>
						</ul>
					</div>
				</>
			)} */}
				<div className="flex flex-1 relative px-6 md:px-0">
					<div className="flex flex-1 flex-col gap-x-1 text-base">
						{/* <span className="text-color-text-disabled font-medium sr-only">
							·
						</span> */}
						<div className="flex flex-row">
							<a
								className="text-color-text-disabled text-base"
								onClick={(e) => {
									e.stopPropagation()
								}}
							>
								{createdAt} - {createdAtFull}
							</a>
							<div className="flex flex-1 flex-row justify-end items-center gap-6">
								<button
									disabled
									className="
										flex
										items-center
										gap-4
										cursor-pointer
										transition
										disabled:cursor-not-allowed
										disabled:opacity-50"
								>
									<OutlineBookmark size={24} />
									Save
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
									Share
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Post
