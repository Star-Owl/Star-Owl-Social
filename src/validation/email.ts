import { z } from 'zod'

export const emailSchema = z.string().email({
	message:
		"Oops! That's not a valid email. Please try again, like this: name@example.com",
})
