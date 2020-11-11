const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer: {
        type: String,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    date: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Review', reviewSchema);
