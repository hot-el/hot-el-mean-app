const Joi = require('joi');
const Room = require('../models/room.model');

const roomSchema = Joi.object({
    number: Joi.number().required(),
    type: Joi.string().required().default('Basic'),
    size: Joi.number().required().min(2),
    conservationDate: Joi.date(),
    occupied: Joi.boolean()
})

module.exports = {
    insert,
    getAllRooms,
    getRoomsByCategory,
    getRoomsByCategoryAndSize,
    getRoomById,
    deleteRoom
}

async function insert(room) {
    room = await Joi.validate(room, roomSchema);
    return await new Room(room).save();
}

async function getAllRooms() {
    return await Room.find();
}

async function getRoomsByCategory(category) {
    return await Room.find().where('type').equals(category);
}

async function getRoomsByCategoryAndSize(category, size) {
    return await Room.find().where('type').equals(category).where('size').equals(size);
}

async function getRoomById(id) {
    return await Room.findById(id);
}

async function deleteRoom(id) {
    return await Room.findByIdAndDelete(id);
}