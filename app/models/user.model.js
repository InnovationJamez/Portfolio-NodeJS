const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Role = require('./role.model');

const userSchema = new mongoose.Schema({
    local: {
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

// methods
// generate a hash
userSchema.methods.generateHash = (password) => {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8), null);
}

// check if password matches (is valid)
userSchema.methods.validPassword = function(password){
    return bcryptjs.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);