import { signUpHandler } from 'next-auth-sanity';
import { sanityClient } from '../auth/[...nextauth]'

export default signUpHandler(sanityClient);