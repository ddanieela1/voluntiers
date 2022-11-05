const mongoose = require('mongoose');
const { Schema } = mongoose;

const organizationSchema = new Schema({
    orgName: {
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
  
},
{timestamps:true}
)

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;