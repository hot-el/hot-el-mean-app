const Joi = require('joi');
const Room = require('../models/room.model');

const roomSchema = Joi.object({
    number: Joi.number().required(),
    roomType: Joi.string().required().default('basic'),
    size: Joi.number().required().min(2),
    conservationDate: Joi.date()
})

module.exports = {
    insert,
    getAllRooms
}

async function insert(room) {
    room = await Joi.validate(room, roomSchema);
    return await new Room(room).save();
}

async function getAllRooms() {
    return await Room.find();
}