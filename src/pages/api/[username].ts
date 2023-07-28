import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'src/libs/prismadb'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'GET') {
		return res.status(405).end()
	}

	try {
		const { username } = req.query

		if (!username || typeof username !== 'string') {
			throw new Error('Invalid username')
		}

		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
			include: {
				Following: true,
				Followers: true,
			},
		})

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const followingCount = user.Following?.length
		const followersCount = user.Followers?.length

		return res.status(200).json({ ...user, followingCount, followersCount })
	} catch (error) {
		console.log(error)
		return res.status(400).end()
	}
}
