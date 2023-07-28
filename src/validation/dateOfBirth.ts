import { z } from 'zod'

export const monthSchema = z
	.number()
	.int()
	.min(1, 'Month should be between 1 and 12')
	.max(12, 'Month should be between 1 and 12')

export const daySchema = z
	.number()
	.int()
	.min(1, 'Day should be between 1 and 31')
	.max(31, 'Day should be between 1 and 31')

const currentYear = new Date().getFullYear()
const minYear = currentYear - 150

export const yearSchema = z
	.number()
	.int()
	.min(minYear, "You can't be older than 150 years")
	.max(currentYear - 13, 'You must be at least 13 years old')
