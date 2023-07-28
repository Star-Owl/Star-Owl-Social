import { useRouter } from 'next/router'
import { useRef, useState, useEffect, ChangeEvent } from 'react'

import Head from 'next/head'
import Nav from '@ui/Nav'
import Header from '@ui/Header'
import Search from '@ui/Search'
import PanelItem from '@ui/PanelItem'
import Panel from '@ui/Panel'
import PanelItemTrends from '@ui/PanelItemTrends'
import Footer from '@ui/Footer'
import Tabs from '@rd/Tabs'
import Twemoji from 'react-twemoji'
import Input from '@ui/Input'

//import Feed from '@ui/Feed'
import Form from '@ui/Form'

import useUser from 'src/hooks/useUser'
//import useIntersectionObserver from 'src/hooks/useIntersectionObserver'

import { useStickyContext } from 'src/contexts/StickyContent'

import HeaderSticky from '@ui/HeaderSticky'
import UserBio from '@ui/userProfile/UserBio'
import UserHero from '@ui/userProfile/UserHero'
import useIntersectionObserver from 'src/hooks/useIntersectionObserver'
import { GetServerSideProps } from 'next'
import SplashScreen from './loading'
import PostFeed from '@ui/posts/PostFeed'

const UserView = () => {
	const router = useRouter()
	const { userId } = router.query

	const { data: fetchedUser, isLoading } = useUser(userId as string)

	const { shouldReserveSpace, setShouldReserveSpace } = useStickyContext()

	const heroRef = useRef<HTMLDivElement>(null)
	const isIntersecting = useIntersectionObserver(heroRef)

	const [headerWidth, setHeaderWidth] = useState(0)

	useEffect(() => {
		const updateWidth = () => {
			if (heroRef.current) {
				setHeaderWidth(heroRef.current.offsetWidth)
			}
		}

		window.addEventListener('resize', updateWidth)
		// Initial update
		updateWidth()
		// Cleanup function
		return () => window.removeEventListener('resize', updateWidth)
	}, [heroRef])

	useEffect(() => {
		if (!isIntersecting) {
			setShouldReserveSpace(true)
		} else {
			setShouldReserveSpace(false)
		}
	}, [isIntersecting])

	useEffect(() => {
		if (!isLoading && !fetchedUser) {
			const timer = setTimeout(() => {
				router.push('/404')
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [isLoading, fetchedUser, router])

	if (isLoading || !fetchedUser) {
		return <SplashScreen />
	}

	const headerStyle = shouldReserveSpace
		? { width: `${headerWidth}px` }
		: { opacity: 0, width: `${headerWidth}px` }

	return (
		<>
			<Head>
				<title>StarOwl | {fetchedUser.displayName}</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				className="
				min-h-screen
				flex
				md:mx-auto
				gap-6
				md:px-0
				grid-cols-12
				xl:grid
				lg:gap-12"
			>
				<Nav />
				<main
					className="
					w-full
					col-span-6
					mb-12
					md:pr-6
					lg:pr-0
					xl:col-span-5
					flex
					flex-col
					gap-6"
				>
					{/* <HeaderSticky
						showBackArrow
						label={fetchedUser?.name}
						style={headerStyle}
					/> */}
					<UserHero ref={heroRef} userId={userId as string} />
					<UserBio userId={userId as string} />
					{/* <Feed userIds={userId as []} /> */}
					<PostFeed userId={userId as string} />
					{/* <Tabs /> */}
				</main>
				<aside
					className="
					col-span-2
					mr-6
					hidden
					lg:flex
					flex-col
					w-1/2
					xl:w-[375px]
					xl:col-span-3"
				>
					<div className="sticky top-12 flex flex-col gap-6">
						<Input
							placeholder="Search roost for..."
							disabled
							onChange={function (
								event: ChangeEvent<HTMLInputElement>,
							): void {}}
						/>
						{/* <Search /> */}
						{/* <Twemoji options={{ className: 'emoji' }}>
							<Panel title="Trending feathers🪶" href="/">
								<PanelItemTrends
									title="Next JS"
									category="Development"
									stat="57.5K"
								/>
								<PanelItemTrends title="Figma" category="Design" stat="107.5K" />
								<PanelItemTrends
									title="Webflow"
									category="Design"
									stat="127.5K"
								/>
								<PanelItemTrends
									title="Tailwind CSS"
									category="Development"
									stat="87.5K"
								/>
								<PanelItemTrends
									title="Vercel"
									category="Development"
									stat="27.5K"
								/>
							</Panel>
						</Twemoji> */}
						{/* <Panel title="Who to follow" href="/">
							<PanelItem
								src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjd8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
								name="Charles Deluvio"
								username="charlesdeluvio"
								initials="CD"
							/>
							<PanelItem
								src="https://images.unsplash.com/photo-1613951085587-cfe5d0a6cffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
								name="Tolga Ulkan"
								username="tolgaulkan"
								initials="TU"
							/>
							<PanelItem
								src="https://images.unsplash.com/photo-1614777735430-7b46df56b404?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3OTAyNDY1Mnx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
								name="Rob Potter"
								username="robpotter"
								initials="RB"
							/>
						</Panel> */}
						<Footer />
					</div>
				</aside>
			</div>
		</>
	)
}

export default UserView