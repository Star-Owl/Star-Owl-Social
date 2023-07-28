import { useState, useEffect, useCallback, useRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { HiOutlineXMark, HiOutlinePencil } from 'react-icons/hi2'
import Form from '../Form'
import Button from '@ui/Button'

import { Close } from 'src/icons/Icons'

function DialogDemo() {
	const [isDialogVisible, setIsDialogVisible] = useState(false)
	const dialogRef = useRef<HTMLElement>(null)

	const handleClick = useCallback(() => {
		setIsDialogVisible(true)
	}, [])

	useEffect(() => {
		if (isDialogVisible) {
			const dialog = document.querySelector('.DialogOverlay')
			if (dialog) {
				console.log(dialog)
			}
		}
		return () => {
			// tutaj wpisz kod, który ma zostać wykonany przy czyszczeniu hooka
		}
	}, [isDialogVisible])

	return (
		<DialogPrimitive.Root>
			<DialogPrimitive.Trigger asChild>
				<div className="w-full flex justify-center xl:justify-start mt-5 appearance-none">
					<Button
						size="large"
						intent="primary"
						fullWidth
						onClick={() => handleClick()}
					>
						<HiOutlinePencil className="w-6 h-6 xl:hidden" />
						<span className="hidden xl:flex">Hoot</span>
					</Button>
				</div>
			</DialogPrimitive.Trigger>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className="DialogOverlay bg-slate-900/60 backdrop-blur-[12px] fixed inset-0 z-30" />
				<DialogPrimitive.Content className="DialogContent bg-color-primary-lighter px-4 pt-4 pb-6 -translate-x-2/4 -translate-y-2/4 rounded-2xl shadow-xl fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-lg max-h-[85vh] focus:outline-none">
					<DialogPrimitive.Close asChild className="mb-4">
						<button
							className="IconButton hover:bg-color-text-subtle rounded-[.5rem] h-10 w-10 flex justify-center items-center"
							aria-label="Close"
						>
							<Close className="h-6" />
						</button>
					</DialogPrimitive.Close>
					{/*<DialogPrimitive.Title className="DialogTitle sr-only">
						Hoot
					</DialogPrimitive.Title>
					<DialogPrimitive.Description className="DialogDescription sr-only">
						Make a Hoot
					</DialogPrimitive.Description>*/}

					<Form
						width="full"
						placeholder={"What's illuminating your world today?"}
					/>

					{/*<DialogPrimitive.Close asChild>
						<button className="Button green">Save changes</button>
					</DialogPrimitive.Close>*/}
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	)
}

export default DialogDemo
