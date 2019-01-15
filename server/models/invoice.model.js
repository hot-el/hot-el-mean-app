const mongoose = require('mongoose');
const Service = require('./service.model');

let ServiceSchema = Service.ServiceSchema

const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        unique: true,
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    services: [{
        ServiceSchema, 
        quantity: {
            type: Number,
            min: 0
        },
        total: {
            type: Number,
            min: 0
        }
    }],
    subTotal: {
        type: Number,
        min: 0
    },
    tax: {
        type: Number,
    },
    grandTotal: {
        type: Number
    }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);