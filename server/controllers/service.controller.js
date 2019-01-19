const Joi = require('joi');
const Service = require('../models/service.model');

const serviceSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().max(60),
    price: Joi.number().min(0)
});

module.exports = {
    insert,
    getAllServices,
    getServiceById,
    update,
    deleteById,
    getByNamePartial
}

async function insert(service) {
    service = await Joi.validate(service, serviceSchema);
    return await new Service(service).save();
}

async function getAllServices() {
    return await Service.find();
}

async function getServiceById(id) {
    return await Service.findById(id);
}

async function update(id, service) {
    service = await Joi.validate(service, serviceSchema);
    return await Service.findByIdAndUpdate(id, service);
}

async function deleteById(id) {
    return await Service.findByIdAndDelete(id);
}

async function getByNamePartial(name) {
    return await Service.find({'name': new RegExp(name, 'i')});
}