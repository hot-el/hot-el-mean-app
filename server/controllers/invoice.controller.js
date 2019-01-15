const Joi = require('joi');
const Invoice = require('../models/invoice.model');

const InvoiceSchema = Joi.object({
    invoiceNumber: Joi.string().required(),
    issueDate: Joi.date(),
    dueDate: Joi.date(),
    services: Joi.array(),
    subTotal: Joi.number().greater(0),
    tax: Joi.number().greater(0).less(100),
    grandTotal: Joi.number().greater(0)
});

module.exports = {
    insert,
    deleteById,
    update,
    getAllInvoices,
    getInvoiceById
}

async function insert(invoice) {
    invoice = await Joi.validate(invoice, InvoiceSchema);
    return await new Invoice(invoice).save();
}

async function deleteById(id) {
    return await Invoice.findByIdAndDelete(id);
}

async function update(id, invoice) {
    invoice = await Joi.validate(invoice, InvoiceSchema);
    return await Invoice.findByIdAndUpdate(id, invoice);
}

async function getAllInvoices() {
    return await Invoice.find();
}

async function getInvoiceById(id) {
    return await Invoice.findById(id);
}