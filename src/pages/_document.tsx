import { Html, Head, Main, NextScript } from 'next/document'
import { ToastContainer } from 'react-toastify'

/**
 * Document component serves as the base HTML document that Next.js will use to render all the other pages in the application.
 * It is commonly used to augment the application's <html> and <body> tags.
 *
 * @component
 *
 * @example
 * return (
 *   <Document />
 * )
 */

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="bg-color-primary-dark text-color-text antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
