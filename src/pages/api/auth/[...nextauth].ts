import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const endpoint = `${process.env.NEXTAPP_URL}/api/v1/auth/users/auth`

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30,
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/',
    },
    callbacks: {
        session({ session, user }) {
            if (user !== null) {
                session.user = user;
            }
            return session;
        },

        jwt({ token, }) {
            return token;
        },
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: 'Email' },
                password: { label: 'Password', type: 'Password' }
            },
            async authorize(credentials) {

                const data = {
                    email: credentials?.username,
                    password: credentials?.password
                }


                const request = await fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const user = await request.json()

                if (request.ok && user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],

})