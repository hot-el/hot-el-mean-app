const Joi = require('joi');
const Shift = require('../models/shift.model');

const shiftSchema = Joi.object({
    id: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().required(),
    title: Joi.string().required(),
    from: Joi.number().required(),
    to: Joi.number().required(),
    start: Joi.date().required(),
    color: Joi.object().keys({
        primary: Joi.string().required(),
        secondary: Joi.string().required()
    })
})

module.exports = {
    insert,
    getAllShifts,
    deleteShift,
    getShiftsByUserId
}

async function insert(shift) {
    shift = await Joi.validate(shift, shiftSchema);
    return await new Shift(shift).save();
}

async function getAllShifts() {
    return await Shift.find();
}

async function getShiftsByUserId(id) {
    return await Shift.find().where('id').equals(id);
}

async function deleteShift(id) {
    return await Shift.findByIdAndDelete(id);
}