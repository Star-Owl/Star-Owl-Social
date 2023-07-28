/**
 * ################################################
 * # Importing Required Libraries and Modules #
 * ################################################
 */

// Importing bcrypt library for password hashing
import bcrypt from 'bcrypt'

// Importing NextApiRequest and NextApiResponse for type-checking API requests and responses
import { NextApiRequest, NextApiResponse } from 'next'

// Importing our Prisma database client
import prisma from 'src/libs/prismadb'

import { v4 as uuidv4 } from 'uuid'

/**
 * ################################################
 * # API Endpoint Handler #
 * ################################################
 *
 * This is the handler function for our API endpoint. It's an async function that accepts a NextApiRequest and a
 * NextApiResponse as its arguments.
 *
 * The handler function first checks if the request method is 'POST', returning a 405 status if it isn't.
 *
 * If the request method is 'POST', the handler function attempts to extract 'email', 'username', 'name', and 'password'
 * from the request body.
 *
 * It then hashes the provided password using bcrypt, and attempts to create a new user in the database with the provided
 * details and the hashed password.
 *
 * If the user is successfully created, the handler function returns a 200 status and the new user object.
 *
 * If an error is encountered during this process, the handler function returns a 400 status.
 */

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).end() // If the request method is not 'POST', return a 405 status
	}

	try {
		const { email, displayName, password, month, day, year } = req.body // Destructure the request body

		const hashedPassword = await bcrypt.hash(password, 12) // Hash the provided password
		let username = `user_${uuidv4()}` // Generate a random UUID
		username = username.substring(0, 16) // Take the first 16 characters of the UUID as the username

		// Create a birthday Date object
		const birthday = new Date(year, month - 1, day) // months are 0-based in JavaScript

		// Attempt to create a new user in the database with the provided details and the hashed password
		const user = await prisma.user.create({
			data: {
				email,
				username,
				displayName,
				hashedPassword,
				birthday,
			},
		})

		return res.status(200).json(user) // If the user is successfully created, return a 200 status and the new user object
	} catch (error) {
		console.log(error) // Log any encountered error
		return res.status(400).end() // If an error is encountered, return a 400 status
	}
}
