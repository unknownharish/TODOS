import { connect } from '../../../database/connect'
import { mynotes } from '../../../database/schema'

export default async function handler(req, res) {

    connect()

    if (req.method == 'GET') {

        try {

            // console.log(req.body)
            let total = await mynotes.find().count()
            res.json(total)

        } catch (error) {
            console.log(error)
        }
    }


}