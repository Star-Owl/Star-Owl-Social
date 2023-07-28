/**
 * ################################################
 * # Importing Required Libraries #
 * ################################################
 */

// Next.js specific imports for API route handling
import { NextApiRequest, NextApiResponse } from 'next'

// Custom server-side authentication module
import serverAuth from 'src/libs/serverAuth'

/**
 * ################################################
 * # API Route Handler #
 * ################################################
 *
 * This is a Next.js API route handler for getting the currently logged in user.
 *
 * The route only responds to GET requests and returns an error for all other HTTP methods.
 * It uses the serverAuth function to authenticate the incoming request and returns
 * the logged in user's data in the response or an error if the user is not logged in.
 */

export default async function handler(
	req: NextApiRequest, // The incoming request object
	res: NextApiResponse, // The outgoing response object
) {
	// Check if the incoming request is a GET request
	if (req.method !== 'GET') {
		// If it's not a GET request, return a 405 (Method Not Allowed) error
		return res.status(405).end('Wrong method')
	}

	try {
		// Try to authenticate the request
		const { currentUser } = await serverAuth(req, res)

		// If authentication is successful, return the user's data in the response
		return res.status(200).json(currentUser)
	} catch (error) {
		// If authentication fails, return a 400 (Bad Request) error
		return res.status(400).end('Not Logged In')
	}
}
