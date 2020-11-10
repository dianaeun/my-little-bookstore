const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    bookTitle: {
        type: String,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});
module.exports = mongoose.model('Request', requestSchema);