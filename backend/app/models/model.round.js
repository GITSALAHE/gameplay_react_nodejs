const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Round = new Schema(
    {
        idUser: {
            type: String,
            required: true,
            trim: true,
            minlenght: 10,
        },
        idCategory : {
            type: String,
            required: true,
            trim: true,
            minlenght: 10,
        },
        question: {
            type: Object,
            required: true,
        },
        attempt : {
            type : Number,
            default : 1
        }
    },
    {
        versionKey: false
    }
)

const GroupEx = mongoose.model("Round", Round);
module.exports = GroupEx;