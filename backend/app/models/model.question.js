const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

const QuestionShema = new Schema({
    contentQuestion: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    contentResponse: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    falseresponse: [
        {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        }

    ],
    idCategory: {
        type: String,
        trim: true,
    },
    valid: {
        type: Boolean,
        default: true,
    },
    point : {
        type: Number,
        default : 10
    }
},
    {
        versionKey: false
    }
);

QuestionShema.plugin(random);

module.exports = mongoose.model('Question', QuestionShema);
