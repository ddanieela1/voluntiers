const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: Number,
        default: 0
    },
    hours: {
        type: Number,
        default: 0
    },

},
{timestamps:true}
)

const User = mongoose.model('User', userSchema);

module.exports = User;