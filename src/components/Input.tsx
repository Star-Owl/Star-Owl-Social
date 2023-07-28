import React, { useState } from 'react'

/**
 * Input component is a reusable form input field component.
 * It provides basic customization options such as defining input type, placeholder,
 * initial value, event handlers for change and key up events, disabled state, and label.
 *
 * @component
 *
 * @example
 * return (
 *   <Input
 *     placeholder="Type here..."
 *     value="Hello"
 *     type="text"
 *     onChange={(e) => console.log(e.target.value)}
 *     onKeyUp={(e) => console.log("Key pressed:", e.key)}
 *     disabled={false}
 *     label="My Input"
 *   />
 * )
 *
 * @returns {React.ReactElement} JSX component for the input field.
 */
interface InputProps {
	/**
	 * Placeholder text for the input field.
	 */
	placeholder?: string
	/**
	 * The current value of the input field.
	 */
	value?: string
	/**
	 * The type of the input field (e.g. "text", "password").
	 */
	type?: string
	/**
	 * Whether the input field should be disabled.
	 */
	disabled?: boolean
	/**
	 * Event handler for the change event.
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	/**
	 * Event handler for the key up event.
	 */
	onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
	/**
	 * Label text for the input field.
	 */
	label?: string
	/**
	 * Determines whether the browser should provide autocomplete suggestions
	 */
	autoComplete?: 'on' | 'off'
	/**
	 * Icon to display in the input field.
	 */
	icon?: React.ReactNode
	/**
	 * Icon to be shown for the input field when the type is 'text'
	 */
	textIcon?: React.ReactNode
	/**
	 * Event handler for the key down event.
	 */
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
	placeholder,
	value,
	type = 'text',
	onChange,
	onKeyUp,
	disabled,
	label,
	autoComplete = 'on',
	icon,
	textIcon,
	onKeyDown,
}) => {
	const [inputType, setInputType] = useState(type)
	const [currentIcon, setCurrentIcon] = useState(icon)

	const handleIconClick = () => {
		if (inputType === 'password') {
			setInputType('text')
			setCurrentIcon(textIcon)
		} else if (inputType === 'text') {
			setInputType('password')
			setCurrentIcon(icon)
		}
	}

	return (
		<div className="w-full relative">
			{label && (
				<p className="text-xl text-white font-semibold mb-2">{label}</p>
			)}
			<input
				disabled={disabled}
				onChange={onChange}
				onKeyUp={onKeyUp}
				value={value}
				placeholder={placeholder}
				type={inputType}
				className="
                    w-full
					max-h-16
                    p-6
                    text-lg
                    text-color-text
                    bg-color-primary-lighter
                    rounded-[1rem]
                    outline-none
                    focus:ring-color-accent
                    focus:ring-2
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    "
				autoComplete={autoComplete}
				onKeyDown={onKeyDown}
			/>
			{currentIcon && (
				<div
					className="
                        absolute
                        right-0
                        top-1/2
                        transform
                        -translate-y-1/2
						cursor-pointer
						flex
						items-center
						justify-center
						transition
						w-16
						h-16
						rounded-[1rem]
						hover:bg-color-primary-badge-opacity
                    "
					onClick={handleIconClick}
				>
					{currentIcon}
				</div>
			)}
		</div>
	)
}

export default Input
