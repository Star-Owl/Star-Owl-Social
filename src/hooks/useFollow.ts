import axios from 'axios'
import { useCallback, useMemo } from 'react'

import useCurrentUser from './useCurrentUser'
import useLoginModal from './useLoginModal'
import useUser from './useUser'

const useFollow = (username: string) => {
	const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
	const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(username)

	const loginModal = useLoginModal()

	type FollowerType = {
		id: string
		userId: string
		followerId: string
		createdAt: Date
	}

	const isFollowing = useMemo(() => {
		if (currentUser && currentUser.Following && fetchedUser) {
			return currentUser.Following.some(
				(following: FollowerType) =>
					following.followerId === fetchedUser.id,
			)
		}

		return false
	}, [currentUser, fetchedUser])

	const toggleFollow = useCallback(async () => {
		if (!currentUser) {
			return loginModal.onOpen()
		}

		try {
			let request

			if (isFollowing) {
				request = () =>
					axios.delete('/api/follow', { data: { username } })
			} else {
				request = () => axios.post('/api/follow', { username })
			}

			await request()
			mutateCurrentUser()
			mutateFetchedUser()

			//toast.success('Success')
		} catch (error) {
			//toast.error('Something went wrong')
		}
	}, [
		currentUser,
		isFollowing,
		username,
		mutateCurrentUser,
		mutateFetchedUser,
		loginModal,
	])

	return {
		isFollowing,
		toggleFollow,
	}
}

export default useFollow
