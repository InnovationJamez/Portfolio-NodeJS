const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    password: {
        type: String,
        required: true
    }
}, {collection: 'Portfolio'});

module.exports = mongoose.model('User', userSchema);