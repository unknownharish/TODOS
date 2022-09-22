import { connect } from '../../../database/connect'
import { mynotes } from '../../../database/schema'

export default async function handler(req, res) {

    connect()

    if (req.method == 'DELETE') {

        try {

            // console.log(req.body)
            let data = await mynotes.deleteOne(req.body)
            res.json(data)

        } catch (error) {
            console.log(error)
        }
    }


}