
import { connect } from '../../../database/connect'
import { mynotes } from '../../../database/schema'



export default async function handler(req, res) {

    connect()
    if (req.method == 'POST') {

        try {

            let data = new mynotes(req.body)

            data = await data.save();
            res.json(data)


        } catch (error) {
            console.log(error)
        }

    }

    if (req.method == 'GET') {


        let sendArray = []

        try {

            // let data = await mynotes.find();
            let data1 = await mynotes.aggregate([{ $match: { pinned: true } }, { $sort: { updatedAt: 1 } }])
            let data2 = await mynotes.aggregate([{ $match: { pinned: false } }, { $sort: { updatedAt: -1 } }])

            let total = data1.length + data2.length
            sendArray = [...data1, ...data2].slice(0, 6)
            res.json({ sendArray, total })

        } catch (error) {
            console.log(error)

        }
    }

    if (req.method == 'PUT') {



        try {

            // console.log(req.body)

            let data = await mynotes.findByIdAndUpdate(req.body._id,{...req.body}) ;
            res.json(data)


        } catch (error) {
            console.log(error)
        }




    }

}

