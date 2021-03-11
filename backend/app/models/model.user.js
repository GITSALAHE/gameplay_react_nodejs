const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        name : {
            type : String,
            required: true,
            trim :true,
            minlength:3
        },
        email : {
            type : String,
            required: true,
            trim :true,
            minlength:3
        },
        password : {
            type : String,
            required: true,
            trim :true,
            minlength:3
        },
        score : {
            type : Number,
            default : 0,
            minlength:1
        }
        },
    {
        versionKey : false
    }
);

module.exports = mongoose.model('User', UserSchema);