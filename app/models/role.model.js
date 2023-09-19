const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {collection: 'Portfolio'});

module.exports = mongoose.model("Role", roleSchema);