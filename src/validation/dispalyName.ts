import { z } from 'zod'

// Assuming isTextValid is in the same folder, if not adjust the path
import { isTextValid } from 'src/libs/isTextValid'

export const displayNameSchema = z
	.string()
	.nonempty("Display Name can't be empty")
	.max(50, 'Display Name is too long. It should have at most 50 characters.')
	.refine(
		(displayName) => {
			const { valid } = isTextValid(displayName)
			return valid
		},
		(displayName) => ({
			message: `Display Name ${isTextValid(displayName).message}`,
		}),
	)
