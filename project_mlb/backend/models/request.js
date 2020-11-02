const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    sender: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});
module.exports = mongoose.model('Request', requestSchema);