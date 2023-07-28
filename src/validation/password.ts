import { z } from 'zod'

// Matches at least one uppercase letter
const hasUppercase = z.string().refine((value) => /[A-Z]/.test(value), {
	message: 'Must contain at least one uppercase letter',
})

// Matches at least one lowercase letter
const hasLowercase = z.string().refine((value) => /[a-z]/.test(value), {
	message: 'Must contain at least one lowercase letter',
})

// Matches at least one digit
const hasDigit = z.string().refine((value) => /\d/.test(value), {
	message: 'Must contain at least one digit',
})

// Matches length of minimum 8 characters
const hasMinLength = z.string().min(8, {
	message: 'Must be at least 8 characters long',
})

// Combine all the conditions to create the password schema
export const passwordSchema = z.intersection(
	z.intersection(hasUppercase, hasLowercase),
	z.intersection(hasDigit, hasMinLength),
)
