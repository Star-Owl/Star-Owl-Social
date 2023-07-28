// import { useEffect, useState } from 'react'
// import { useInView } from 'react-intersection-observer'

// import Post from '@ui/Post'
// import usePosts from 'src/hooks/usePosts'

// interface Props {
// 	userIds: string[]
// }

// const Feed: React.FC<Props> = ({ userIds }) => {
// 	// const { posts, error, isLoading, hasMore, loadMore } = usePosts(userIds)

// 	const { ref, inView } = useInView({
// 		threshold: 0,
// 	})

// 	useEffect(() => {
// 		if (inView && hasMore) {
// 			loadMore()
// 		}
// 	}, [inView, hasMore, loadMore])

// 	if (isLoading) return <h2>Loading...</h2>
// 	if (error) return <h2>Error loading posts: {error.message}</h2>

// 	return (
// 		<section className="flex flex-col gap-y-6">
// 			{posts?.map((post: Record<string, any>, index: number) => (
// 				<article
// 					ref={posts.length - 1 === index ? ref : null}
// 					key={post.id}
// 					post-id={post.id}
// 					className="flex gap-y-6"
// 				>
// 					<Post userId={post.userId} key={post.id} data={post} />
// 				</article>
// 			))}
// 		</section>
// 	)
// }

// export default Feed

export {}
