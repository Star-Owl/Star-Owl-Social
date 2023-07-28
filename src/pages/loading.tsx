import React from 'react'
import { Logo, LogoText } from 'src/icons/Icons'

const SplashScreen = () => (
	<div
		className="
		w-full
		min-h-screen
		bg-gradient-to-br
		from-color-accent
		to-color-accent-darker
		flex
		items-center
		justify-center"
	>
		<h1 className="text-xxl3 font-bold">
			STAROWL
			<sup className="ml-6 -top-10 bg-color-text text-color-accent text-lg rounded-[.625rem] py-[.625rem] px-[1.350rem]">
				ALPHA
			</sup>
		</h1>
		<LogoText className="absolute bottom-12" size={128} color="white" />
	</div>
)

export default SplashScreen
