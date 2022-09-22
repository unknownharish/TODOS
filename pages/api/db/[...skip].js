import { connect } from '../../../database/connect'
import { mynotes } from '../../../database/schema'

export default async function handler(req, res) {

    connect()

    if (req.method == 'GET') {

        let sendArray = []

        try {
            let { skip } = req.query

            let data1 = await mynotes.aggregate([{ $match: { pinned: true } }, { $sort: { updatedAt: -1 } }])
            let data2 = await mynotes.aggregate([{ $match: { pinned: false } }, { $sort: { updatedAt: -1 } }])

            let total = data1.length + data2.length


            sendArray = [...data1, ...data2].slice(6 * skip).slice(0, 6)
            res.json({sendArray,total})

        } catch (error) {
            console.log(error)
        }
    }


}