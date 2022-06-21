import NextAuth, { NextAuthOptions } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { UserSchema } from '../../../utils/schemas/index'
import CredentialsProvider from "next-auth/providers/credentials"
import createClient from "@sanity/client"
import {getUserByEmailQuery} from "./query"
import argon2 from "argon2"

export const sanityClient = createClient({
    projectId: process.env.STY_PROJECT,
    dataset: process.env.STY_DATASET,
    token: process.env.STY_TOKEN,
    useCdn: true
})

const options = {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Email', type: 'text', placeholder: 'Email address'},
                password: { label: 'Password', type: 'password', placeholder: 'password' }
            },
            async authorize(credentials, req) {
                // fetch user from sanity and check its existence
                const user = await sanityClient.fetch(getUserByEmailQuery, {userSchema: UserSchema, email: credentials.email})
                if (!user) throw new Error("Account not found")

                if (await argon2.verify(user.password, credentials.password)) {
                    return {
                        email: user.email,
                        name: user.name,
                        id: user._id
                    }
                }

                throw new Error("Wrong Password")
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
};

export default NextAuth(options);
