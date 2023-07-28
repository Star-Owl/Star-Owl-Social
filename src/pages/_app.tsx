import '../styles/styles.css'
import type { AppProps } from 'next/app'
import { ModalProvider } from 'src/contexts/ModalContext'
import { SessionProvider } from 'next-auth/react'
import { StickyProvider } from 'src/contexts/StickyContent'
import { isTextValid } from 'src/libs/isTextValid'
import { toast, ToastContainer } from 'react-toastify'
import { z, ZodError } from 'zod'
import { useEffect, useState } from 'react'
import SplashScreen from './loading'
import loadable from '@loadable/component'

/**
 * App component is the main entry point for the application.
 * It wraps the application with necessary providers for the application's global state.
 *
 * @component
 * @param {object} props - The properties that define the App component.
 * @param {JSX.Element} props.Component - The current page to be rendered.
 * @param {object} props.pageProps - The initial props of the current page.
 *
 * @example
 * return (
 *   <App Component={HomePage} pageProps={{}} />
 * )
 */

// const HomeComponent = loadable(() => import('./home'), {
// 	fallback: <SplashScreen />,
// })

// const UserProfileComponent = loadable(() => import('./[userId]'), {
// 	fallback: <SplashScreen />,
// })

// const ErrorComponent = loadable(() => import('./404'), {
// 	fallback: <SplashScreen />,
// })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<main>
				<ModalProvider>
					<StickyProvider>
						<Component {...pageProps} />
					</StickyProvider>
				</ModalProvider>
			</main>
			<ToastContainer limit={10} />
		</SessionProvider>
	)
}
