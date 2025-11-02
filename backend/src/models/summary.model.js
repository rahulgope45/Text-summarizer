import mongoose from "mongoose";

const summarySchema = new mongoose.Schema(
    {
        orignalText: {
            type: String,
            required: true,
        },

        summarizedText: {
            type: String, 
            required: true,
        },

        wordLimit:{
            type: Number,
            default: 100,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true
    }
);


export default mongoose.model("Summary", summarySchema);