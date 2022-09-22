import mongoose from "mongoose";

const schema = mongoose.Schema({

    title: {
        type: String,
        required:true,
    },
    body: {
        type: String,
        required:true,

    },
    pinned:{
        type:Boolean,
        default:false
    },
      updatedAt:{
        type:Number,
        required:true
    }


},)

// { timestamps: true }

   // updatedAt:{
    //     type:Number,
    //     required:true
    // }


export const mynotes = mongoose.models.TODO || mongoose.model("TODO", schema);