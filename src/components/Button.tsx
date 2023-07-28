import { cva } from 'class-variance-authority'
import classNames from 'classnames'

interface Props {
	children?: React.ReactNode
	label?: string
	intent?:
		| 'primary'
		| 'secondary'
		| 'danger'
		| 'outline'
		| 'ghost'
		| 'text'
		| 'icon'
	isFollowing?: boolean
	fullWidth?: boolean
	size?: 'micro' | 'small' | 'default' | 'large'
	onClick?: () => void
	disabled?: boolean
	outline?: boolean
}

const ButtonStyles = cva(
	`
        flex
        justify-center
        items-center
        transition
        font-bold
        disabled:opacity-50
        disabled:cursor-not-allowed
		leading-6
    `,
	{
		variants: {
			intent: {
				primary: 'bg-color-accent text-color-text hover:opacity-80',
				secondary:
					'bg-color-text text-color-primary-dark hover:opacity-80',
				danger: 'bg-color-danger text-color-text hover:opacity-80',
				outline:
					'bg-transparent ring-inset ring-2 ring-color-text hover:bg-color-text hover:text-color-primary-dark ',
				ghost: 'bg-accent text-white border-accent transition-all duration-200 hover:bg-accent_darker disabled:hover:bg-accent',
				text: '/* twoje style dla wariantu text */',
				icon: '/* twoje style dla wariantu icon */',
			},
			size: {
				micro: 'text-sm px-[1.5rem] py-[.75rem] rounded-[0.625rem]',
				small: 'text-base px-[2rem] py-[1rem] rounded-[0.875rem]',
				default: 'text-lg px-[2.5rem] py-[1.25rem] rounded-[1rem]',
				large: 'text-xl px-[3rem] py-[1.5rem] rounded-[1.125rem]',
			},
			fullWidth: {
				true: 'w-full',
				false: 'w-fit',
			},
		},
	},
)

const Button: React.FC<Props> = ({
	children,
	label,
	intent = 'primary',
	isFollowing,
	fullWidth,
	onClick,
	size = 'default',
	disabled,
}: Props) => {
	const buttonClass = classNames(ButtonStyles({ intent, size, fullWidth }), {
		disabled,
	})

	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`${buttonClass} ${isFollowing ? 'following' : ''}`}
		>
			{children}
			{label}
		</button>
	)
}

export default Button
