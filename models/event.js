const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    location: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        required: true
    },
    organizationId: {
        type: String,
        required: true
    }
    
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;