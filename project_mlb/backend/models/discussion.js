const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const discussionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true 
    },
    tag: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    }
});
module.exports = mongoose.model('Discussion', discussionSchema);
