import Link from 'next/link'
import Twemoji from 'react-twemoji'
import { Logo } from 'src/icons/Icons'
import packageJson from 'package.json'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div>
			<div className="flex flex-wrap gap-x-2 gap-y-2 text-xs text-color-text-disabled mb-3">
				<Link className="" href="/">
					Terms of Service
				</Link>
				<Link className="" href="/">
					Privacy Policy
				</Link>
				<Link className="" href="/">
					Cookie Policy
				</Link>
				<Link className="" href="/">
					Accessibility
				</Link>
				<Link className="" href="/">
					Ads info
				</Link>
				<Link className="" href="/">
					More
				</Link>
			</div>
			<div className="flex flex-wrap gap-x-2 gap-y-2 text-xs text-color-text-disabled mb-3">
				<Twemoji options={{ className: 'emoji' }}>
					<div className="gap-x-[2px] flex flex-wrap items-center">
						{`\u00A9 ${currentYear} ♠️♦️ Poker Cats Creations ♣️♥️`}
					</div>
				</Twemoji>
				<Twemoji options={{ className: 'emoji' }}>
					<div className="gap-x-[2px] flex flex-wrap items-center">
						{`⭐️ StarOwl 🦉 alpha ${packageJson.version}`}
					</div>
				</Twemoji>
			</div>
		</div>
	)
}

export default Footer
