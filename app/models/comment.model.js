const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true
    }
}, {collection: 'Portfolio'});

module.exports = mongoose.model("Comment", commentSchema);