const mongoose = require('mongoose');
const { Schema } = mongoose;

const opportunitySchema = new Schema({
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
        
    },
    endTime: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Organization',
        required: true
    },
    Hours: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hour',
        
    },
},
{ timestamps:true}
);


const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;