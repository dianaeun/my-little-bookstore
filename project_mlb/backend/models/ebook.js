const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const eBookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    rating:{
        type: Schema.Types.ObjectId,
        ref: 'Rating'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('EBook', eBookSchema);

