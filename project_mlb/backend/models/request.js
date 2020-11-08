const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    bookTitle: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
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