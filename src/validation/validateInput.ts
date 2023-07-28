import { z } from 'zod'

export const validateInput = async (input: any, schema: z.ZodSchema<any>) => {
	try {
		schema.parse(input)
		return Promise.resolve()
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorList = error.issues.map(
				(issue, index) => `${index + 1}: ${issue.message}`,
			)
			return Promise.reject(errorList)
		}
		return Promise.reject(['Unknown error'])
	}
}
