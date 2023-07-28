import usePosts from 'src/hooks/usePosts'
import PostItem from './PostItem'
import Post from '@ui/Post'
import Button from '@ui/Button'

interface PostFeedProps {
	userId?: string
	homepage?: boolean
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
	const {
		posts,
		isLoadingInitialData,
		isLoadingMore,
		size,
		setSize,
		isReachingEnd,
	} = usePosts(userId)

	if (isLoadingInitialData) {
		return <p>Loading...</p> // można dodać tutaj jakiś spinner lub ekran ładowania
	}

	if (posts.length === 0) {
		return (
			<>
				<section className="flex flex-col items-center gap-y-6 leading-6">
					<h1 className="text-xxl2 font-bold">Wlecome to StarOwl!</h1>
					<p className="items-center text-center text-color-text-disabled">
						Your gateway to a universe of creativity and
						inspiration. Start your journey by connecting with
						artists and visionaries around the globe.
					</p>
					<Button
						intent="primary"
						size="large"
						label="Take Flight!"
						disabled
						// disabled={isReachingEnd || isLoadingMore}
						// onClick={() => setSize(size + 1)}
					/>
				</section>
			</>
		)
	}

	return (
		<>
			<section className="flex flex-col gap-y-6">
				{posts.map((post: Record<string, any>) => (
					<article
						key={post.id}
						post-id={post.id}
						className="flex gap-y-6"
					>
						<Post userId={userId} key={post.id} data={post} />
					</article>
				))}
			</section>

			<div className="inline-flex justify-center">
				<Button
					intent="outline"
					label={
						isLoadingMore
							? 'Loading more...'
							: isReachingEnd
							? 'No more posts'
							: 'Load more'
					}
					disabled={isReachingEnd || isLoadingMore}
					onClick={() => setSize(size + 1)}
				/>
			</div>
		</>
	)
}

export default PostFeed

// const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
// 	const { data: followedUsers = [], error: followedUsersError } =
// 		useFollowedUsers(userId)
// 	const followedUsersIds = followedUsers.map((user: any) => user.id)
// 	const { data: posts = [], error: postsError } = usePosts(followedUsersIds)

// 	if (followedUsersError) {
// 		return <div>Error loading followed users. Please try again later.</div>
// 	}

// 	if (postsError) {
// 		return <div>Error loading posts. Please try again later.</div>
// 	}

// 	return (
// 		<>
// 			{posts.map((post: Record<string, any>) => (
// 				<Post userId={post.userId} key={post.id} data={post} />
// 			))}
// 		</>
// 	)
// }
