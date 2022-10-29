const mongoose = require('mongoose');
const { Schema } = mongoose;

const hourSchema = new Schema({
    signIn: {
        type: Date,
        required: true,
    },
    signOut: {
        type: Date,
        required: true,
    }
    
})

const Hour = mongoose.model('Hour', hourSchema);

module.exports = Hour;