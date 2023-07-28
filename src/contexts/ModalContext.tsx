/**
 * ##########################################
 * # Import Necessary Modules from React and Context API #
 * ##########################################
 */
import React, { createContext, useState, useContext, ReactNode } from 'react'

/**
 * ##########################################
 * # Context Creation #
 * ##########################################
 * Context provides a way to pass data through the component tree
 * without having to pass props down manually at every level.
 * We are creating a context for login and registration modals
 * with default values.
 */
export const ModalContext = createContext({
	isLoginModalVisible: false,
	setLoginModalVisible: (value: boolean) => {},
	isRegisterModalVisible: false,
	setRegisterModalVisible: (value: boolean) => {},
})

/**
 * ##########################################
 * # Context Provider Creation #
 * ##########################################
 * The context provider wraps child components, enabling them to access the context.
 * The provider uses useState to manage the current state of modals.
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
	// Define state for the login modal and a function to alter it
	const [isLoginModalVisible, setLoginModalVisible] = useState(false)

	// Define state for the registration modal and a function to alter it
	const [isRegisterModalVisible, setRegisterModalVisible] = useState(false)

	/**
	 * The context provider passes down state and state-altering functions to its children.
	 * Every child wrapped in ModalProvider now has access to these values.
	 */
	return (
		<ModalContext.Provider
			value={{
				isLoginModalVisible,
				setLoginModalVisible,
				isRegisterModalVisible,
				setRegisterModalVisible,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}

/**
 * ##########################################
 * # Custom Hook Creation #
 * ##########################################
 * Creating a custom hook useModalContext that simplifies the use of our context.
 * Instead of useContext(ModalContext) in every component that wants to use the context,
 * we can simply use useModalContext().
 */
export const useModalContext = () => useContext(ModalContext)
