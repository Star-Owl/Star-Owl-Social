import { cva } from 'class-variance-authority';
import classNames from 'classnames';
import React from 'react';

interface Props {
	disabled?: boolean | undefined;
	children: React.ReactNode;
	intent?: 'primary' | 'primary_accent' | 'outline';
	size?: 'default' | 'small' | 'large';
	rounded?: 'none' | 'small' | 'medium' | 'large';
	full?: 'yes' | 'no';
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonStyles = cva(
	'inline-flex justify-center items-center font-bold border sm:w-auto xl:w-full',
	{
		variants: {
			intent: {
				primary: 'bg-slate-900 text-white border-transparent',
				primary_accent:
					'bg-accent text-white border-accent transition-all duration-200 hover:bg-accent_darker disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-accent',
				outline: 'bg-transparent text-slate-900 border-slate-200',
			},
			size: {
				default: 'px-4 py-[9px] text-sm',
				small: 'px-4 py-[5px] text-sm',
				large: 'px-3.5 text-lg sm:py-3.5 xl:px-20 py-3',
			},
			rounded: {
				none: 'rounded-none',
				small: 'rounded-[.5rem]',
				medium: 'rounded-[.656rem]',
				large: `rounded-[1rem]`,
			},
			full: {
				yes: 'w-full',
				no: 'w-auto',
			},
		},
		defaultVariants: {
			intent: 'primary',
			size: 'default',
		},
	},
);

/*const Button = ({ children, intent, size, full, rounded, onClick, ...props }: Props) => (
  	<button className={ButtonStyles({ intent, size, full, rounded })} onClick={onClick} {...props}>{children}</button>
);*/

const Button: React.FC<Props> = ({
	disabled = false,
	children,
	intent = 'primary',
	size = 'default',
	rounded = 'none',
	full = 'no',
	onClick,
}: Props) => {
	const buttonClass = classNames(
		ButtonStyles({ intent, size, full, rounded }),
		{ disabled },
	);

	return (
		<button className={buttonClass} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
