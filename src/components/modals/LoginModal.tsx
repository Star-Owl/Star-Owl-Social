/**
 * ##########################################
 * # Import Built-In Libraries #
 * ##########################################
 */
import { useState, useCallback } from 'react'

/**
 * ##########################################
 * # Import External Libraries #
 * ##########################################
 */
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { signIn } from 'next-auth/react'
import { z, ZodError } from 'zod'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * ##########################################
 * # Import Internal Modules/Components #
 * ##########################################
 */
import { useModalContext } from 'src/contexts/ModalContext'

/**
 * ##########################################
 * # Import UI Components #
 * ##########################################
 */
import Button from '@ui/Button'
import Input from '@ui/Input'

/**
 * ##########################################
 * # Import Icons #
 * ##########################################
 */

import { Close, OutlineEye, OutlineEyeOff } from 'src/icons/Icons'

/**
 * ##########################################
 * # LoginModal Component #
 * ##########################################
 */

function LoginModal() {
	/**
	 * We are using the context here by calling our custom hook useModalContext().
	 * This provides us with access to isLoginModalVisible, setLoginModalVisible,
	 * and setRegisterModalVisible.
	 */
	const {
		isLoginModalVisible,
		setLoginModalVisible,
		setRegisterModalVisible,
	} = useModalContext()

	/**
	 * State management with useState.
	 * isDialogVisible: controls the visibility of the dialog box (initialized to false)
	 * email, password: holds user's input for email and password (initialized to empty string)
	 * isLoading: to show the loading state when form is being submitted (initialized to false)
	 */
	const [isDialogVisible, setIsDialogVisible] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	/**
	 * Function: onToggle
	 * This function will be triggered when user wants to switch between Login and Register.
	 * It's wrapped with the useCallback hook for optimization, ensuring it doesn't get
	 * redeclared with each render unless its dependencies change.
	 */
	const onToggle = useCallback(() => {
		setLoginModalVisible(false)
		setRegisterModalVisible(true)
	}, [])

	/**
	 * Function: handleClick
	 * This function is responsible for opening the login dialog
	 * when user clicks the "Login" button. It's also wrapped in a useCallback.
	 */
	const handleClick = useCallback(() => {
		setIsDialogVisible(true)
	}, [])

	// Create a validation schema
	const schema = z.object({
		email: z
			.string()
			.email(
				"Oops! That's not a valid email. Please try again, like this: name@example.com",
			),
	})

	// Use the schema
	const validateEmail = async (email: string) => {
		try {
			schema.parse({ email })
			toast.success(`Email is valid`, {
				position: 'bottom-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: 'dark',
				className: 'z-40',
			})
		} catch (error) {
			if (error instanceof ZodError) {
				toast.error(`${error.errors[0].message}`, {
					position: 'bottom-right',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'dark',
					className: 'z-40',
				})
				// toast(`test ${error.errors[0].message}`, {
				// 	position: 'bottom-right',
				// })
			}
		}
	}

	/**
	 * Function: onSubmit
	 * This function handles the form submission for login.
	 * On submission, it tries to authenticate the user with the provided email and password.
	 * If successful, it shows a success toast notification. If not, it shows an error notification.
	 * It's also wrapped in a useCallback.
	 */
	const onSubmit = useCallback(async () => {
		validateEmail(email)
		try {
			setIsLoading(true)
			await signIn('credentials', { email, password })
			toast.success('Logged in')
		} catch (error) {
			toast.error('Bruh')
		} finally {
			setIsLoading(false)
		}
	}, [email, password])

	return (
		<DialogPrimitive.Root
			open={isLoginModalVisible}
			onOpenChange={setLoginModalVisible}
		>
			<DialogPrimitive.Trigger asChild>
				<div className="flex justify-center xl:justify-start appearance-none">
					<Button
						intent="outline"
						label="Login"
						onClick={() => handleClick()}
					>
						{/* <HiOutlinePencil className="w-6 h-6 xl:hidden" />
						<span className="hidden xl:flex">Login</span> */}
					</Button>
				</div>
			</DialogPrimitive.Trigger>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className="DialogOverlay bg-slate-900/60 backdrop-blur-[12px] fixed inset-0 z-30" />
				<DialogPrimitive.Content className="DialogContent bg-color-primary-dark px-6 pt-6 pb-6 -translate-x-2/4 -translate-y-2/4 rounded-2xl shadow-xl fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-xl max-h-[85vh] focus:outline-none">
					<div className="flex items-center justify-between w-full mb-12">
						<DialogPrimitive.Title className="text-xl">
							Login
						</DialogPrimitive.Title>
						<DialogPrimitive.Close asChild>
							<button
								className="hover:bg-color-text-subtle rounded-[.5rem] h-10 w-10 flex justify-center items-center"
								aria-label="Close"
							>
								<Close className="h-6" />
							</button>
						</DialogPrimitive.Close>
					</div>
					{/* <DialogPrimitive.Description className="DialogDescription">
						Make a Hoot
					</DialogPrimitive.Description> */}

					<div className="flex flex-col gap-4">
						<Input
							placeholder="Email"
							onChange={(e) => {
								setEmail(e.target.value)
							}}
							value={email}
							disabled={isLoading}
						/>
						<Input
							placeholder="Password"
							type="password"
							onChange={(e) => {
								setPassword(e.target.value)
							}}
							value={password}
							disabled={isLoading}
							autoComplete="off"
							icon={<OutlineEye className="w-6" />}
							textIcon={<OutlineEyeOff className="w-6" />}
						/>

						<Button
							intent="outline"
							label="Login"
							size="large"
							onClick={() => onSubmit()}
						>
							{/* <HiOutlinePencil className="w-6 h-6 xl:hidden" />
						<span className="hidden xl:flex">Login</span> */}
						</Button>
					</div>

					<div className="text-neutral-400 text-center mt-12">
						<p>
							First time using StarOwl?
							<span
								onClick={onToggle}
								className="
									text-white
									cursor-pointer
									hover:underline
								"
							>
								{' '}
								Create an account
							</span>
						</p>
					</div>

					{/*<DialogPrimitive.Close asChild>
						<button className="Button green">Save changes</button>
					</DialogPrimitive.Close>*/}
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	)
}

export default LoginModal
