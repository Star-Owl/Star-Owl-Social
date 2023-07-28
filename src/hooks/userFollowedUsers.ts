import useSWR from 'swr'
import fetcher from 'src/libs/fetcher'

const useFollowedUsers = (userId?: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		userId ? `/api/users/${userId}/following` : null,
		fetcher,
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export default useFollowedUsers
