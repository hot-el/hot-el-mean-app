const Joi = require('joi');
const Room = require('../models/room.model');

const roomSchema = Joi.object({
    number: Joi.number().required(),
    type: Joi.string().required().default('Basic'),
    size: Joi.number().required().min(2),
    conservationDate: Joi.date(),
    occupied: Joi.boolean(),
    reserved: Joi.boolean(),
    firstName: Joi.string()
        .when('occupied', { is: true, then: Joi.required() })
        .when('reserved', { is: true, then: Joi.required() }),
    lastName: Joi.string()
        .when('occupied', { is: true, then: Joi.required() })
        .when('reserved', { is: true, then: Joi.required() }),
    idCard: Joi.string()
        .when('occupied', { is: true, then: Joi.required() })
        .when('reserved', { is: true, then: Joi.required() }),
    from: Joi.date()
        .when('occupied', { is: true, then: Joi.required() })
        .when('reserved', { is: true, then: Joi.required() }),
    to: Joi.date()
        .when('occupied', { is: true, then: Joi.required() })
        .when('reserved', { is: true, then: Joi.required() })
});

module.exports = {
    insert,
    getAllRooms,
    getRoomsByCategory,
    getRoomsByCategoryAndSize,
    getRoomById,
    deleteRoom,
    getRoomsByCategorySizeReservedAndOccupied,
    getRoomsByCategoryReservedAndOccupied,
    getRoomsByOccupied,
    getRoomsByReserved,
    getFreeRooms,
    update
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

async function getRoomsByCategorySizeReservedAndOccupied(category, size, reserved, occupied) {
    return await Room.find().where('type').equals(category)
        .where('size').equals(size)
        .where('reserved').equals(reserved)
        .where('occupied').equals(occupied).sort({number: 1});
}

async function getRoomsByCategoryReservedAndOccupied(category, reserved, occupied) {
    return await Room.find().where('type').equals(category)
        .where('reserved').equals(reserved)
        .where('occupied').equals(occupied).sort({number: 1});
}

async function getRoomsByOccupied(occupied) {
    return await Room.find().where('occupied').equals(occupied).sort({number: 1});
}

async function getRoomsByReserved(reserved) {
    console.log(reserved);
    return await Room.find().where('reserved').equals(reserved).sort({number: 1});
}

// where('from').gte(Date.now()).

async function update(id, room) {
    console.log(room);
    room = await Joi.validate(room, roomSchema);
    return await Room.findByIdAndUpdate(id, room);
}

async function getFreeRooms(reserved, occupied) {
    return await Room.find().where('occupied').equals(occupied)
        .where('reserved').equals(reserved).sort({number: 1});
}
