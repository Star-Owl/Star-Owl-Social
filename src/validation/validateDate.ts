import { z } from 'zod'
import { daySchema, monthSchema, yearSchema } from './dateOfBirth'

export const validateDate = async (
	day: string,
	month: string,
	year: string,
) => {
	try {
		// Konwersja stringów na liczby
		const dayNum = Number(day)
		const monthNum = Number(month)
		const yearNum = Number(year)

		// Walidacja daty
		await Promise.all([
			monthSchema.parse(monthNum),
			daySchema.parse(dayNum),
			yearSchema.parse(yearNum),
		])

		// Walidacja całej daty
		const fullDate = new Date(yearNum, monthNum - 1, dayNum)

		if (
			fullDate.getFullYear() !== yearNum ||
			fullDate.getMonth() !== monthNum - 1 ||
			fullDate.getDate() !== dayNum
		) {
			throw new Error('The date provided is not valid.')
		}
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorList = error.issues.map(
				(issue, index) => `${index + 1}: ${issue.message}`,
			)
			throw new Error(JSON.stringify(errorList)) // Tu zamieniamy błędy na JSON
		}

		throw new Error('Unknown error')
	}
}
