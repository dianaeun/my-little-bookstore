const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    owner: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true 
    },
    // tag: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Book'
    // },
    tag: {
        type: String,
        required: true
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
    // comments: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'Comment'
    // }
    comments: {
        type: Array,
        required: true,
        default: []
    }
});
module.exports = mongoose.model('Discussion', discussionSchema);
