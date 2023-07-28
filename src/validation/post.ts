import { z } from 'zod'

// User Roles Enum
const UserRole = {
	USER: 'user',
	STAR: 'starUser',
}

// Schemas
const PostCreateSchemaForNormalUser = z
	.string()
	.max(250, "Post can't exceed 250 characters.")
const PostCreateSchemaForStarUser = z
	.string()
	.max(500, "Post can't exceed 500 characters.")

export const getMaxPostLength = (userRole: string) => {
	switch (userRole) {
		case UserRole.STAR:
			return 500
		case UserRole.USER:
		default:
			return 250
	}
}

// Post create validation function
// Post create validation function
export const validatePostCreate = (postText: string, userRole: string) => {
	let schema

	switch (userRole) {
		case UserRole.STAR:
			schema = PostCreateSchemaForStarUser
			break
		case UserRole.USER:
		default:
			schema = PostCreateSchemaForNormalUser
			break
	}

	// try {
	// 	schema.parse(postText)
	// 	return null // No error
	// } catch (error) {
	// 	if (error instanceof z.ZodError) {
	// 		return error.errors[0].message // Return the first error message
	// 	}
	// 	return null
	// }
}
