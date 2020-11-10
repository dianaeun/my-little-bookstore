const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    // firstName: {
    //     type: String,
    //     required: true
    // },
    // lastName: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    preferredGenres: {
        type: Array,
        required: true,
        default: []
    }
});
module.exports = mongoose.model('User', userSchema);
