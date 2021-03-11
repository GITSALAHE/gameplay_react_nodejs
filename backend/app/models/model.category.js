const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
        nomCategory : {
            type : String,
            required: true,
            trim :true,
            minlength:3
        },
        },
    {
        versionKey : false
    }
);

module.exports = mongoose.model('Category', CategorySchema);