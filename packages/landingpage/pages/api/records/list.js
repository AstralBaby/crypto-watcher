import {sanityClient} from "../auth/[...nextauth]";

export default async function getRecords(req, res){
    try {
        const result = await sanityClient.fetch(`*[_type == $schema]`, {schema: 'cryptocurrency'})
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}