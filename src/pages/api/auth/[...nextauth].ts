/**
 * ################################################
 * # Importing Required Libraries, Modules and Secrets #
 * ################################################
 */

// Importing bcrypt library for password hashing
import bcrypt from 'bcrypt'

// Importing NextAuth and AuthOptions from next-auth for handling authentication
import NextAuth, { AuthOptions } from 'next-auth'

// Importing CredentialsProvider from next-auth/providers for handling credential-based authentication
import CredentialsProvider from 'next-auth/providers/credentials'

// Importing PrismaAdapter from @next-auth/prisma-adapter for connecting NextAuth to our Prisma database
import { PrismaAdapter } from '@next-auth/prisma-adapter'

// Importing our Prisma database client
import prisma from 'src/libs/prismadb'

/**
 * ################################################
 * # Authentication Options Configuration #
 * ################################################
 *
 * This object defines the configuration for our NextAuth authentication setup. It specifies that we're using
 * the Prisma Adapter for our database, and the Credentials Provider for our authentication method.
 *
 * The Credentials Provider is set up to expect 'email' and 'password' credentials, and includes an 'authorize'
 * function that checks the provided credentials against those stored in our database. If the credentials match,
 * the user is authenticated.
 */

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma), // Use the Prisma Adapter for our database
	providers: [
		CredentialsProvider({
			name: 'credentials', // The name of the credentials provider
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				// If no email or password were provided, throw an error
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Invalid credentials')
				}

				// Try to find a user in the database that matches the provided email
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
					include: {
						Following: true, // Upewnij się, że zwracasz obiekt "Following"
					},
				})

				// If no user was found, or the user doesn't have a hashedPassword, throw an error
				if (!user || !user?.hashedPassword) {
					throw new Error(
						`User Not Found - ${credentials.email}, ${credentials?.password}`,
					)
				}

				// Compare the provided password with the stored hashedPassword
				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.hashedPassword,
				)

				// If the passwords don't match, throw an error
				if (!isCorrectPassword) {
					throw new Error(
						`Invalid Password - ${user.email}, ${user.username}, ${user.hashedPassword}`,
					)
				}

				// If everything checks out, return the user
				return user
			},
		}),
	],
	pages: {
		error: '/error', // Change this to your own error page
	},
	debug: process.env.NODE_ENV === 'development', // Enable debug mode in development environment
	session: {
		strategy: 'jwt', // Use JWT for session handling
	},
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET, // Secret for JWT
	},
	secret: process.env.NEXTAUTH_SECRET, // Secret for NextAuth
}

/**
 * #############################################
 * # NextAuth Authentication Function #
 * #############################################
 *
 * This is the default export for our NextAuth setup. It's a function call to NextAuth, passing
 * in our authOptions object.
 */

export default NextAuth(authOptions)
