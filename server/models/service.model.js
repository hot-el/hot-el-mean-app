const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number
    }
});

Service = mongoose.model('Service', ServiceSchema),

module.exports = {
    Service, 
    ServiceSchema
}