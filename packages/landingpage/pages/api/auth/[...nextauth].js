import NextAuth, { NextAuthOptions } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { UserSchema } from '../../../utils/schemas/index'
import CredentialsProvider from "next-auth/providers/credentials"
import createClient from "@sanity/client"
import {getUserByEmailQuery} from "./query"
import argon2 from "argon2"
import {SanityAdapter, SanityCredentials} from "next-auth-sanity";

export const sanityClient = createClient({
    projectId: process.env.STY_PROJECT,
    dataset: process.env.STY_DATASET,
    token: process.env.STY_TOKEN,
    useCdn: false
})

const options = {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        SanityCredentials(sanityClient)
    ],
    session: {
        strategy: 'jwt'
    },
    secret: "kjaksdjasdd",
    adapter: SanityAdapter(sanityClient),
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }) => {
            const { isAdmin } = await sanityClient.fetch(`*[_type == $schema && _id == $id][0]`, {schema: 'user', id: token.user.id})
            session.user = {...token.user, isAdmin};  // Setting token in session

            return session;
        },
    }
};

export default NextAuth(options);
