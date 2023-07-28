import { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'src/libs/prismadb'
import serverAuth from 'src/libs/serverAuth'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST' && req.method !== 'DELETE') {
		return res.status(405).end()
	}

	console.log('req')

	try {
		const { username } = req.body

		// Log the username for debugging
		console.log(`Username: ${username}`)

		const { currentUser } = await serverAuth(req, res)

		// Log the current user for debugging
		console.log(`Current User: ${JSON.stringify(currentUser)}`)

		if (
			!username ||
			typeof username !== 'string' ||
			username.trim() === ''
		) {
			throw new Error('Invalid Username')
		}

		const user = await prisma.user.findFirst({
			where: {
				username: username,
			},
		})

		if (!user) {
			throw new Error('Invalid Username')
		}

		if (req.method === 'POST') {
			//Create follower relationship
			await prisma.follower.create({
				data: {
					userId: currentUser.id,
					followerId: user.id,
				},
			})
			//NOTIFICATION PART START
			try {
				await prisma.notification.create({
					data: {
						body: 'Someone followed you!',
						userId: user.id,
					},
				})
				await prisma.user.update({
					where: {
						id: user.id,
					},
					data: {
						hasNotification: true,
					},
				})
			} catch (error) {
				console.log(`Notification Error: ${error}`)
			}
			//NOTIFICATION PART END
		}

		if (req.method === 'DELETE') {
			// Delete follower relationship
			await prisma.follower.deleteMany({
				where: {
					userId: currentUser.id,
					followerId: user.id,
				},
			})
		}

		const updatedUser = await prisma.user.findFirst({
			where: {
				id: currentUser.id,
			},
			include: {
				Following: true,
				Followers: true,
			},
		})

		return res.status(200).json(updatedUser)
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: 'Something went wrong' })
	} finally {
		if (!res.headersSent) {
			res.status(500).json({ error: 'No response sent' })
		}
	}
}
