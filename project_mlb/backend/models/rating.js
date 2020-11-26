const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    bookTitle: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    ratingSum:{
        type: Number,
        required: true
    },
    raters:{
        type: Array,
        required: true,
        default: []
    }
});
module.exports = mongoose.model('Rating', ratingSchema);

