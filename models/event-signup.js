const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSignupSchema = new Schema({
    fulfilled: Boolean,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date,
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
    },
});

const EventSignup = mongoose.model('EventSignup', eventSignupSchema);

module.exports = EventSignup;