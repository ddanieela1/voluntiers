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
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
        required: [true, "Please Select Event"]
    },
    userId: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        required: true
    },
    hoursId: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'Hours'},
        required: true
    },
});

const EventSignup = mongoose.model('EventSignup', eventSignupSchema);

module.exports = EventSignup;