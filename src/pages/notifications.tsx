import Header from '@ui/HeaderProfile'
//import NotificationsFeed from '@/src/components/NotificationsFeed'
import useCurrentUser from 'src/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context)

	if (!session) {
		return {
			redirect: {
				destination: '/home',
				permanent: false,
			},
		}
	}

	return {
		props: {
			session,
		},
	}
}

const Notifications = () => {
	return (
		<>
			<Header showBackArrow label="Notifications" />
			<p>Notifications page</p>
			{/* <NotificationsFeed /> */}
		</>
	)
}

export default Notifications
