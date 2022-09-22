import mongoose from "mongoose";

export const connect = () => {

    mongoose.connect(process.env.MONGO, (err, data) => {
        !err ? console.log('server connected') : console.log(err)
    })

}