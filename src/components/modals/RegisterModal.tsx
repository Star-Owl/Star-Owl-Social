import { useState, useCallback } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'

import { useModalContext } from 'src/contexts/ModalContext'

import Input from '@ui/Input'
import Button from '@ui/Button'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { OutlineEye, OutlineEyeOff } from 'src/icons/Icons'

import { Close } from 'src/icons/Icons'
import Twemoji from 'react-twemoji'
import {
	displayNameSchema,
	emailSchema,
	passwordSchema,
} from 'src/validation/validationSchemas'
import { validateInput } from 'src/validation/validateInput'
import { validateDate } from 'src/validation/validateDate'
import { daySchema, monthSchema, yearSchema } from 'src/validation/dateOfBirth'
import { z } from 'zod'

/**
 * The RegisterModal component provides a two-step registration form
 * inside a dialog modal. The user is required to input a valid email,
 * password, and display name. After submitting, a POST request is made
 * to '/api/register' endpoint to register a new user.
 *
 * @returns {React.ReactElement} The rendered RegisterModal component
 */
const RegisterModal = (): React.ReactElement => {
	// Uses the custom React context to get/set the visibility state of the register and login modals
	const {
		isRegisterModalVisible,
		setRegisterModalVisible,
		setLoginModalVisible,
	} = useModalContext()

	// State variables for the user registration details
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [displayName, setDisplayName] = useState('')
	const [month, setMonth] = useState('')
	const [day, setDay] = useState('')
	const [year, setYear] = useState('')

	// Loading state for form submission
	const [isLoading, setIsLoading] = useState(false)

	// Step state to switch between registration steps
	const [page, setPage] = useState(1)

	// Switches to the login modal
	const onToggle = () => {
		setRegisterModalVisible(false)
		setLoginModalVisible(true)
	}

	const handleClick = () => setPage(1)

	// Handles back button click to return to step 1
	const onBack = () => setPage(1)

	// Handles next button click to move to step 2 after validating display name
	const onNext = async () => {
		try {
			await validateDisplayName(displayName)
			await validateEmail(email)
			await validatePassword(password)

			setPage(2)
		} catch (error) {
			if (Array.isArray(error)) {
				for (let errorMessage of error) {
					toast.error(errorMessage, {
						position: 'bottom-right',
						autoClose: 5000,
						theme: 'dark',
					})
				}
			}
		}
	}

	// Creates the validation functions
	const validateDisplayName = async (displayName: string) => {
		return validateInput(displayName, displayNameSchema)
	}
	const validateEmail = async (email: string) => {
		return validateInput(email, emailSchema)
	}
	const validatePassword = async (password: string) => {
		return validateInput(password, passwordSchema)
	}

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true)

			const validationResults = await Promise.allSettled([
				validateInput(email, emailSchema),
				validateInput(password, passwordSchema),
				validateInput(displayName, displayNameSchema),
				validateDate(day, month, year),
			])

			const errors = validationResults
				.filter((result) => result.status === 'rejected')
				.map((result) => (result as PromiseRejectedResult).reason)

			if (errors.length > 0) {
				errors.forEach((err) => {
					if (typeof err === 'string') {
						toast.error(err, {
							position: 'bottom-right',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: false,
							pauseOnHover: false,
							draggable: false,
							progress: undefined,
							theme: 'dark',
						})
					} else if (err instanceof Error) {
						const errorMessages = JSON.parse(err.message)
						errorMessages.forEach((message: string) =>
							toast.error(message, {
								position: 'bottom-right',
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: false,
								pauseOnHover: false,
								draggable: false,
								progress: undefined,
								theme: 'dark',
							}),
						)
					}
				})
				return
			}

			await axios.post('/api/register', {
				email,
				password,
				displayName,
				month,
				day,
				year,
			})

			toast.success('Account created.', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: 'dark',
			})

			signIn('credentials', {
				email,
				password,
			})
		} catch (error) {
			toast.error('Something went wrong.', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: 'dark',
			})
		} finally {
			setIsLoading(false)
		}
	}, [email, password, displayName, month, day, year])

	function isNumericKey(key: string): boolean {
		const numericKeys = '0123456789'
		return numericKeys.includes(key)
	}

	function isFunctionalKey(key: string): boolean {
		const functionalKeys = [
			'Backspace',
			'Delete',
			'ArrowUp',
			'ArrowDown',
			'ArrowLeft',
			'ArrowRight',
			'Tab',
		]
		return functionalKeys.includes(key)
	}

	// Render the component
	return (
		<DialogPrimitive.Root
			open={isRegisterModalVisible}
			onOpenChange={setRegisterModalVisible}
		>
			<DialogPrimitive.Trigger asChild>
				<div className="flex justify-center xl:justify-start appearance-none">
					<Button label="Register" onClick={() => handleClick()}>
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
							Register
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

					{page === 1 ? (
						<div className="flex flex-col gap-8">
							{/* Formularz na stronie 1 */}
							<main className="flex flex-col gap-4">
								<Input
									placeholder="Display Name"
									onChange={(e) => {
										setDisplayName(e.target.value)
									}}
									value={displayName}
									disabled={isLoading}
									autoComplete="off"
								/>
								<Input
									placeholder="Email"
									onChange={(e) => {
										setEmail(e.target.value)
									}}
									value={email}
									disabled={isLoading}
									autoComplete="off"
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
							</main>
							{/* ...inne pola */}
							<Button
								label="Next"
								onClick={onNext}
								size="large"
							/>
						</div>
					) : (
						<div className="flex flex-col gap-8">
							{/* Formularz na stronie 2 */}
							<main className="flex flex-col gap-4">
								<Input
									placeholder="Display Name"
									value={displayName}
									disabled
								/>
								<Input
									placeholder="Email"
									value={email}
									disabled
								/>
							</main>
							<div className="flex flex-col gap-4">
								<header className="flex flex-col gap-2">
									<h2 className="text-2xl">Date of birth</h2>
									<Twemoji options={{ className: 'emoji' }}>
										<p className="text-color-text-disabled gap-x-[.125rem] leading-normal">
											To make sure you&apos;re seeing the
											right stars in our ⭐️ StarOwl 🦉
											galaxy, we need your birth date.
											Your cosmic info stays confidential!
										</p>
									</Twemoji>
								</header>
								<main className="flex gap-4">
									<Input
										placeholder="Month"
										onChange={(e) => {
											let value = e.target.value
												? parseInt(e.target.value, 10)
												: 0
											if (
												typeof value === 'number' &&
												value > 12
											)
												value = 12
											if (
												typeof value === 'number' &&
												value < 1 &&
												e.target.value !== ''
											)
												value = 1
											setMonth(
												value ? value.toString() : '',
											)
										}}
										value={month}
										onKeyDown={(event) => {
											if (
												!isNumericKey(event.key) &&
												!isFunctionalKey(event.key)
											) {
												event.preventDefault()
											}
										}}
									/>
									<Input
										placeholder="Day"
										onChange={(e) => {
											let value = e.target.value
												? parseInt(e.target.value, 10)
												: 0
											if (
												typeof value === 'number' &&
												value > 31
											)
												value = 31
											if (
												typeof value === 'number' &&
												value < 1 &&
												e.target.value !== ''
											)
												value = 1
											setDay(
												value ? value.toString() : '',
											)
										}}
										value={day}
										onKeyDown={(event) => {
											if (
												!isNumericKey(event.key) &&
												!isFunctionalKey(event.key)
											) {
												event.preventDefault()
											}
										}}
									/>
									<Input
										placeholder="Year"
										onChange={(e) => {
											setYear(e.target.value)
										}}
										onKeyDown={(event) => {
											if (
												!isNumericKey(event.key) &&
												!isFunctionalKey(event.key)
											) {
												event.preventDefault()
											}
										}}
										value={year}
									/>
								</main>
							</div>
							{/* ...inne pola */}
							<div className="flex gap-4">
								<Button
									label="Back"
									onClick={onBack}
									fullWidth
									intent="outline"
									size="large"
								/>
								<Button
									label="Register"
									onClick={onSubmit}
									fullWidth
									size="large"
								/>
							</div>
						</div>
					)}

					<div className="text-neutral-400 text-center mt-12">
						<p>
							Already have an account?
							<span
								onClick={onToggle}
								className="
									text-white
									cursor-pointer
									hover:underline
								"
							>
								{' '}
								Sign in
							</span>
						</p>
					</div>

					{/* <div className="flex flex-col gap-4">
						<Input
							placeholder="Email"
							onChange={(e) => {
								setEmail(e.target.value)
							}}
							value={email}
							disabled={isLoading}
						/>
						<Input
							placeholder="Name"
							onChange={(e) => {
								setName(e.target.value)
							}}
							value={name}
							disabled={isLoading}
						/>
						<Input
							placeholder="Username"
							onChange={(e) => {
								setUsername(e.target.value)
							}}
							value={username}
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
						/>

						<Button
							label="Register"
							onClick={() => onSubmit()}
						></Button>
					</div>

					<div className="text-neutral-400 text-center mt-12">
						<p>
							Already have an account?
							<span
								onClick={onToggle}
								className="
									text-white
									cursor-pointer
									hover:underline
								"
							>
								{' '}
								Sign in
							</span>
						</p>
					</div> */}

					{/*<DialogPrimitive.Close asChild>
						<button className="Button green">Save changes</button>
					</DialogPrimitive.Close>*/}
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	)
}

export default RegisterModal
