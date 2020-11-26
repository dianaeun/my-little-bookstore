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
        type: Schema.Types.ObjectId,
        ref: 'Rating'
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
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Book', bookSchema);

