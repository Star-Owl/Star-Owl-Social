import { NextApiRequest, NextApiResponse } from 'next'

import serverAuth from 'src/libs/serverAuth'
import prisma from 'src/libs/prismadb'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST' && req.method !== 'GET') {
		return res.status(405).end()
	}

	try {
		if (req.method === 'POST') {
			const { currentUser } = await serverAuth(req, res)
			const { body } = req.body

			const post = await prisma.post.create({
				data: {
					body,
					userId: currentUser.id,
				},
			})

			return res.status(200).json(post)
		}

		if (req.method === 'GET') {
			const { currentUser } = await serverAuth(req, res)
			const { userId, _start, _limit } = req.query

			const limit = _limit ? Number(_limit) : undefined
			const start = _start ? Number(_start) : undefined

			let posts

			if (userId && typeof userId === 'string') {
				posts = await prisma.post.findMany({
					where: {
						user: {
							username: userId,
						},
					},
					include: {
						user: true,
						comments: true,
					},
					skip: start,
					take: limit,
					orderBy: {
						createdAt: 'desc',
					},
				})
			} else {
				const followedUsers = currentUser.Following.map(
					(follower) => follower.followerId,
				)

				posts = await prisma.post.findMany({
					where: {
						userId: {
							in: [...followedUsers, currentUser.id],
						},
					},
					include: {
						user: true,
						comments: true,
					},
					skip: start,
					take: limit,
					orderBy: {
						createdAt: 'desc',
					},
				})
			}

			return res.status(200).json(posts)
		}
	} catch (error) {
		console.log(error)
		return res.status(400).end()
	}
}
