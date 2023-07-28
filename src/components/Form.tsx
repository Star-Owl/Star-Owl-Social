import Avatar from '@rd/Avatar'
import Link from 'next/link'
import Button from '@ui/Button'
import AccountNavItem from '@ui/AccountNavItem'
import {
	RiImage2Line,
	RiFileGifLine,
	RiChatPollLine,
	RiEmotionLine,
	RiMapPin2Line,
} from 'react-icons/ri'
import Twemoji from 'react-twemoji'

import { cva } from 'class-variance-authority'
import { useCallback, useEffect, useRef, useState } from 'react'
import AvatarShape from './AvatarShape'

import useLoginModal from 'src/hooks/useLoginModal'
import useRegisterModal from 'src/hooks/useRegisterModal'
import useCurrentUser from 'src/hooks/useCurrentUser'
import usePosts from 'src/hooks/usePosts'
import usePost from 'src/hooks/usePost'
import axios from 'axios'
import { toast } from 'react-toastify'
import LoginModal from './modals/LoginModal'
import RegisterModal from './modals/RegisterModal'
import { v4 as uuidv4 } from 'uuid'

import { validatePostCreate } from 'src/validation/validationSchemas'
import useUser from 'src/hooks/useUser'
import router from 'next/router'
import { getMaxPostLength } from 'src/validation/post'
import { formatNumber } from 'src/libs/formatNumber'

interface Props {
	placeholder: string
	isComment?: boolean
	postId?: string
	width: 'default' | 'full'
}

const FormStyles = cva(
	`
		flex
		flex-col
		gap-x-2
		gap-y-4
		bg-color-primary-lighter
		rounded-[1rem]
	`,
	{
		variants: {
			width: {
				default: 'p-6',
				full: '',
			},
		},
		defaultVariants: {
			width: 'default',
		},
	},
)

const Form: React.FC<Props> = ({ placeholder, isComment, postId, width }) => {
	const { data: currentUser } = useCurrentUser()
	const { mutate: mutatePosts } = usePosts()
	const { mutate: mutatePost } = usePost(postId as string)

	const maxPostLength = getMaxPostLength(currentUser?.role)

	const [isLoading, setIsLoading] = useState(false)

	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const [body, setBody] = useState<string>('')

	const [charCount, setCharCount] = useState(0)

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const postText = e.target.value
		setBody(postText)

		const newLineCount = (postText.match(/\n/g) || []).length
		const charCount = postText.length + newLineCount * 50

		setCharCount(charCount)

		//const validationResult = validatePostCreate(postText, currentUser?.role)
		// if (postText.length > maxPostLength) {
		// 	toast.error(e.target.value.length, {
		// 		position: 'bottom-center',
		// 		autoClose: 3000,
		// 		theme: 'dark',
		// 	})
		// }
	}

	useEffect(() => {
		const lineHeight = 20 // Change this according to your CSS
		const padding = 20 // Change this according to your CSS
		const maxRows = 5 // Define max rows

		// validatePost(body)

		if (textareaRef.current) {
			const textAreaLineHeight = lineHeight
			textareaRef.current.rows = 2

			const newRows = ~~(
				(textareaRef.current.scrollHeight - padding) /
				textAreaLineHeight
			)

			if (newRows === 0) {
				textareaRef.current.rows = 2
			} else if (newRows > maxRows) {
				textareaRef.current.rows = maxRows
			} else {
				textareaRef.current.rows = newRows
			}

			// If the new rows count is less than the previous count
			// set scrollTop to 0. This is needed to avoid jumping in some browsers.
			if (newRows < textareaRef.current.rows) {
				textareaRef.current.scrollTop = 0
			}
		}
	}, [body])

	function parseBodyText(text: string): string {
		let parsedText = text

		// Wyszukaj hashtagi i zamień na linki
		parsedText = parsedText.replace(
			/#(\w+)/g,
			'<a href="/hashtag/$1">#$1</a>',
		)

		// Wyszukaj nazwy użytkowników i zamień na linki
		parsedText = parsedText.replace(/@(\w+)/g, '<a href="/user/$1">@$1</a>')

		// Wyszukaj URL-e i zamień na linki
		parsedText = parsedText.replace(
			/\b((http|https):\/\/\S+)/g,
			'<a href="$1">$1</a>',
		)

		return parsedText
	}

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true)

			const url = isComment
				? `/api/comments?postId=${postId}`
				: '/api/posts'

			await axios.post(url, { body })

			toast.success('Post created', {
				position: 'bottom-center',
				autoClose: 1500,
				theme: 'dark',
			})
			setBody('')
			mutatePosts()
			mutatePost()
		} catch (error) {
			toast.error('Something went wrong.', {
				position: 'bottom-center',
				autoClose: 1500,
				theme: 'dark',
			})
		} finally {
			setIsLoading(false)
		}
	}, [body, mutatePosts, isComment, postId, mutatePost])

	return (
		<section className={`${FormStyles({ width })}`}>
			{currentUser ? (
				<div>
					<div className="flex flex-1 gap-4 mb-4">
						{/* <Avatar
						src="https://pbs.twimg.com/profile_images/1612908659511533579/nlTjUYYV_400x400.jpg"
						alt="Hasira's Avatar"
						initials="H"
					/> */}
						<AvatarShape
							src={
								currentUser?.profileImage ||
								'/images/placeholder.png'
							}
							size={48}
							shape={currentUser?.avatarShape}
							uuid={uuidv4()}
						/>
						<textarea
							ref={textareaRef}
							value={body}
							disabled={isLoading}
							onChange={handleInputChange}
							placeholder={placeholder}
							className="leading-normal w-full px-0 py-3 text-xl bg-transparent border-transparent placeholder:text-slate-600 outline-0 focus:outline-none appearance-none focus:ring-0 focus:border-transparent resize-none"
						/>
					</div>
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-x-4 px-4">
							<Link href="/">
								<RiImage2Line className="w-5 h-5" />
								<span className="sr-only">Image</span>
							</Link>
							<Link href="/">
								<RiFileGifLine className="w-5 h-5" />
								<span className="sr-only">Gif</span>
							</Link>
							<Link href="/">
								<RiChatPollLine className="w-5 h-5" />
								<span className="sr-only">Poll</span>
							</Link>
							<Link href="/">
								<RiEmotionLine className="w-5 h-5" />
								<span className="sr-only">Emoji</span>
							</Link>
							<Link href="/">
								<RiMapPin2Line className="w-5 h-5" />
								<span className="sr-only">Tag location</span>
							</Link>
						</div>
						<div className="flex items-center gap-6">
							<span
								className={`text-color-text-disabled ${
									charCount > maxPostLength
										? '!text-color-danger'
										: ''
								}`}
							>
								{formatNumber(charCount)} / {maxPostLength}
							</span>
							<Button
								disabled={
									isLoading ||
									!body ||
									charCount > maxPostLength
								}
								intent="primary"
								size="small"
								onClick={onSubmit}
								label="Hoot"
							></Button>
						</div>
					</div>
				</div>
			) : (
				<div>
					<h1 className="text-2xl text-center mb-4 font-bold">
						Wlecome to StarOwl!
					</h1>
					<div className="flex flex-row items-center justify-center gap-4">
						<LoginModal />
						<RegisterModal />
						{/* <Button
							intent="outline"
							label="Login"
							onClick={loginModal.onOpen}
						/> */}
						{/* <Button
							label="Register"
							onClick={registerModal.onOpen}
						/> */}
					</div>
				</div>
			)}
		</section>
	)
}

export default Form
