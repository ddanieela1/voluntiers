const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSignupSchema = new Schema({
    fulfilled: Boolean,
    eventId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Event',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    hoursId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hours'
    }
},
    { timestamps: true },
);

const EventSignup = mongoose.model('EventSignup', eventSignupSchema);

module.exports = EventSignup;