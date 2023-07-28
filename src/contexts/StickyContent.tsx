import React, {
	createContext,
	useContext,
	useState,
	useRef,
	useEffect,
	ReactNode,
} from 'react'
//import useIntersectionObserver from '../hooks/useIntersectionObserver'

interface StickyContextProps {
	shouldReserveSpace: boolean
	setShouldReserveSpace: React.Dispatch<React.SetStateAction<boolean>>
}

const StickyContext = createContext<StickyContextProps | undefined>(undefined)

interface StickyProviderProps {
	children: ReactNode
}

export const StickyProvider: React.FC<StickyProviderProps> = ({ children }) => {
	const [shouldReserveSpace, setShouldReserveSpace] = useState(false)
	const heroRef = useRef<HTMLDivElement>(null)

	//const isIntersecting = useIntersectionObserver(heroRef)

	// useEffect(() => {
	// 	if (!isIntersecting) {
	// 		setShouldReserveSpace(true)
	// 	} else {
	// 		setShouldReserveSpace(false)
	// 	}
	// }, [isIntersecting])

	return (
		<StickyContext.Provider
			value={{ shouldReserveSpace, setShouldReserveSpace }}
		>
			{children}
		</StickyContext.Provider>
	)
}

export const useStickyContext = () => {
	const context = useContext(StickyContext)

	if (!context) {
		throw new Error('useStickyContext must be used within a StickyProvider')
	}

	return context
}
