// since api folder is mapped to api routes, index will be record creation endpoint so it keeps the convention.
import {sanityClient} from "../auth/[...nextauth]";
import {uuid} from "@sanity/uuid";
import {getSession} from "next-auth/react";

export default async function addRecord(req, res){
    const { user } = await getSession({req})
    await sanityClient.create({
        ...req.body.record,
        _id: `entries.cryptocurrency.${uuid()}`,
        _type: "cryptocurrency",
        author: {
            _type: "reference",
            _ref: user.id
        }
    })

    try {
        // small validation, should use yup or ajv validation and return proper error codes instead.
        if (!req.body.record) res.status(400).send("Record is required")

        res.status(201).json(req.body.record)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}