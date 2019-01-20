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
    deleteRoom,
    getRoomsByCategorySizeAndOccupied,
    getRoomsByCategoryAndOccupied,
    getRoomsByOccupied
}

async function insert(room) {
    room = await Joi.validate(room, roomSchema);
    return await new Room(room).save();
}

async function getAllRooms() {
    return await Room.find().sort({number: 1});
}

async function getRoomsByCategory(category) {
    return await Room.find().where('type').equals(category).sort({number: 1});
}

async function getRoomsByCategoryAndSize(category, size) {
    return await Room.find().where('type').equals(category).where('size').equals(size).sort({number: 1});
}

async function getRoomById(id) {
    return await Room.findById(id);
}

async function deleteRoom(id) {
    return await Room.findByIdAndDelete(id);
}

async function getRoomsByCategorySizeAndOccupied(category, size, occupied) {
    return await Room.find().where('type').equals(category)
        .where('size').equals(size)
        .where('occupied').equals(occupied).sort({number: 1});
}

async function getRoomsByCategoryAndOccupied(category, occupied) {
    return await Room.find().where('type').equals(category)
        .where('occupied').equals(occupied).sort({number: 1});
}

async function getRoomsByOccupied(occupied) {
    return await Room.find().where('occupied').equals(occupied).sort({number: 1});
        
}