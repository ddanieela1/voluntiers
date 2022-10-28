const mongoose = require('mongoose');
const { Schema } = mongoose;

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    contactPerson: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    } 
})

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;