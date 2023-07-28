import numeral from 'numeral'
import Twemoji from 'react-twemoji'
import { formatNumber } from 'src/libs/formatNumber'
import UserInfo from './user/UserInfo'
import { parseBodyText } from 'src/libs/functions/parseText'
import Tag from './user/Tag'

const UserCard = ({
	name,
	username,
	description,
	following,
	followers,
}: {
	name: string
	username: string
	description: string
	following: number
	followers: number
}) => (
	<>
		<UserInfo size={'small'} intent={'primary'} userId={username} />
		<Twemoji options={{ className: 'emoji' }}>
			{/* gap-x-1 mb-4 leading-relaxed whitespace-pre-wrap px-6 md:px-0 */}
			<div className="text-sm my-2 leading-relaxed whitespace-pre-wrap">
				{parseBodyText(
					description,
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
		<div className="flex gap-x-4">
			<div className="flex gap-x-1">
				<div className="text-sm font-bold leading-none">
					{formatNumber(following)}
				</div>
				<div className="text-sm text-slate-500 leading-none">
					Following
				</div>
			</div>
			<div className="flex gap-x-1">
				<div className="text-sm font-bold leading-none">
					{formatNumber(followers)}
				</div>
				<div className="text-sm text-slate-500 leading-none">
					Followers
				</div>
			</div>
		</div>
	</>
)

export default UserCard
