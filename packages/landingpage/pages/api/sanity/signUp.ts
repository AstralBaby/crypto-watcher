import { signUpHandler } from 'next-auth-sanity';
import { client } from '../../../utils/auth'

export default signUpHandler(client);