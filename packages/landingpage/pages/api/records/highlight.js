// since api folder is mapped to api routes, index will be record creation endpoint so it keeps the convention.
import {sanityClient} from "../auth/[...nextauth]";
import {uuid} from "@sanity/uuid";
import {getSession} from "next-auth/react";

export default async function addRecord(req, res){
    try {
        const { user } = await getSession({req})

        if (req.method === 'POST') {
            if (!req.body.coinId) return res.status(400).send("Invalid payload")
            if (req.body.highlight) {
                await sanityClient.create({
                    _id: `user.favorite.${uuid()}`,
                    _type: "favorite",
                    cryptocurrency: req.body.coinId,
                    user: {
                        _type: "reference",
                        _ref: user.id
                    }
                })
                res.status(201).json({ cryptocurrency: req.body.coinId })
            } else {
                await sanityClient.delete({ query: `*[_type == "favorite" && user->_id == "${user.id}" && cryptocurrency == "${req.body.coinId}"][0]`})
                res.status(202).send('deleted')
            }
        } else {
            const result = await sanityClient.fetch(`*[_type == "favorite" && user->_id == "${user.id}"]`)
            res.status(200).json(result)
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}