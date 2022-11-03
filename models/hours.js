const mongoose = require('mongoose');
const { Schema } = mongoose;

const hourSchema = new Schema({
    signIn: {
        type: String,
        required: true,
    },
    signOut: {
        type: String,
        required: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Event',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    
},
)

const Hour = mongoose.model('Hour', hourSchema);

module.exports = Hour;