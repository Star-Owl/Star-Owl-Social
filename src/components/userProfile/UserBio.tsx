import { useMemo } from 'react'
import { BiCalendar } from 'react-icons/bi'
import { format } from 'date-fns'

import useCurrentUser from 'src/hooks/useCurrentUser'
import useUser from 'src/hooks/useUser'
import useFollow from 'src/hooks/useFollow'
import useEditModal from 'src/hooks/useEditModal'

import Button from '../Button_old'
import { parseBodyText } from 'src/libs/functions/parseText'
import Tag from '@ui/user/Tag'
import Twemoji from 'react-twemoji'

interface UserBioProps {
	userId: string
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
	const { data: fetchedUser } = useUser(userId)

	const createdAt = useMemo(() => {
		if (!fetchedUser?.createdAt) {
			return null
		}

		return format(new Date(fetchedUser.createdAt), 'MMMM yyyy')
	}, [fetchedUser?.createdAt])

	return (
		<div className="pb-4">
			<div className="px-4">
				<div className="flex flex-col">
					{fetchedUser?.bio ? (
						<p className="leading-relaxed whitespace-pre-wrap">
							<Twemoji options={{ className: 'emoji' }}>
								{parseBodyText(
									fetchedUser?.bio,
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
										const urlWithScheme = url.startsWith(
											'http',
										)
											? url
											: `https://${url}`
										return (
											<a
												href={urlWithScheme}
												target="_blank"
												rel="noopener noreferrer"
												className="text-color-accent hover:underline"
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												{url}
											</a>
										)
									},
								).map((part, i) => (
									<span key={i}>{part}</span>
								))}
							</Twemoji>
							{/* {fetchedUser?.bio} */}
						</p>
					) : (
						''
					)}
					<div
						className="
                            flex
                            flex-row
                            items-center
                            gap-2
                            mt-4
                            text-neutral-500"
					>
						<BiCalendar size={24} />
						<p>Joined {createdAt}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserBio
