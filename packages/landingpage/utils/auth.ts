import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { NextApiRequest, NextApiResponse } from 'next';
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import createClient from '@sanity/client'

export const client = createClient({
    projectId: process.env.STY_PROJECT,
    dataset: process.env.STY_DATASET,
    token: process.env.STY_TOKEN,
    useCdn: true
})

const options: NextAuthOptions = {
    providers: [
        // GitHub({
        //     clientId: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET
        // }),
        SanityCredentials(client) // only if you use sign in with credentials
    ],
    session: {
        strategy: 'jwt'
    },
    adapter: SanityAdapter(client)
};

export default NextAuth(options);
