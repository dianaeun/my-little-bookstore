const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: false
    },
    rating:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    genre:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: true
    },
    requests: {
        type: [Schema.Types.ObjectId],
        ref: 'Request'
    }
});
module.exports = mongoose.model('Book', bookSchema);

