const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    discussion: {
        type: Schema.Types.ObjectId,
        ref: 'Discussion'
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
module.exports = mongoose.model('Comment', commentSchema);
