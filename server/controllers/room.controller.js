const Joi = require('joi');
const Room = require('../models/room.model');

const roomSchema = Joi.object({
    number: Joi.number().required(),
    type: Joi.string().required().default('Basic'),
    size: Joi.number().required().min(2),
    conservationDate: Joi.date(),
    occupied: Joi.boolean(),
    reserved: Joi.boolean(),
    reservations: Joi.array().items(
        Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            idCard: Joi.string().required(),
            from: Joi.date().required()       , 
            to: Joi.date().required(),
            chechedIn: Joi.boolean().required()
        }).allow(null)
    )
    // firstName: Joi.string()
    //     .when('occupied', { is: true, then: Joi.required() })
    //     .when('reserved', { is: true, then: Joi.required() }),
    // lastName: Joi.string()
    //     .when('occupied', { is: true, then: Joi.required() })
    //     .when('reserved', { is: true, then: Joi.required() }),
    // idCard: Joi.string()
    //     .when('occupied', { is: true, then: Joi.required() })
    //     .when('reserved', { is: true, then: Joi.required() }),
    // from: Joi.date()
    //     .when('occupied', { is: true, then: Joi.required() })
    //     .when('reserved', { is: true, then: Joi.required() }),
    // to: Joi.date()
    //     .when('occupied', { is: true, then: Joi.required() })
    //     .when('reserved', { is: true, then: Joi.required() })
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
    update,
    getAllFreeRoomsInPeriod,
    getAllFreeRoomsInPeriodBySize,
    getAllFreeRoomsInPeriodBySizeAndType,
    getReservations,
    getActiveReservations,
    getOccupied,
    updateReservation,
    getReservation,
    deleteReservation
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
    console.log("HEJ");
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

async function update(id, room) {
    console.log(room);
    room = await Joi.validate(room, roomSchema);
    return await Room.findByIdAndUpdate(id, room, {new: true});
}

async function getFreeRooms(reserved, occupied) {
    return await Room.find().where('occupied').equals(occupied)
        .where('reserved').equals(reserved).sort({number: 1});
}

async function getAllFreeRoomsInPeriod(from_, to_) {

    return await Room.find(
            { reservations: 
                { $not: 
                    { "$elemMatch" : { $or: [
                        { from: { $lte: from_}, to: { $gte: to_ } },
                        { from: { $lte: from_}, to: { $gte: from_ } },
                        { from: { $lte: to_}, to: { $gte: to_ } }
                        ]}
                    }
                }
            }
    )
}


async function getAllFreeRoomsInPeriodBySize(from_, to_, size) {

    return await Room.find(
            { reservations: 
                { $not: 
                    { "$elemMatch" : { $or: [
                        { from: { $lte: from_}, to: { $gte: to_ } },
                        { from: { $lte: from_}, to: { $gte: from_ } },
                        { from: { $lte: to_}, to: { $gte: to_ } }
                        ]}
                    }
                }
            }
    ).where('size').equals(size);
}

async function getAllFreeRoomsInPeriodBySizeAndType(from_, to_, size, type) {

    return await Room.find(
            { reservations: 
                { $not: 
                    { "$elemMatch" : { $or: [
                        { from: { $lte: from_}, to: { $gte: to_ } },
                        { from: { $lte: from_}, to: { $gte: from_ } },
                        { from: { $lte: to_}, to: { $gte: to_ } }
                        ]}
                    }
                }
            }
    ).where('size').equals(size).where('type').equals(type);
}

async function getReservations() {
    return await Room.aggregate( [ { $unwind: "$reservations" } ] );
}


async function getActiveReservations() {
    return await Room.aggregate([
        { $project: {
            type: 1,
            size: 1,
            number: 1,
            occupied: 1,
            reservations: { $filter: {
                input: '$reservations',
                as: 'reservation',
                cond: { $and: [ { $gte: ['$$reservation.from', new Date(Date.now() - 60 * 60 * 24 * 1000)] }, { $ne: ['$$reservation.checkedIn', true] } ] }
            }}
        }},
        { $match: { $and: [ { reservations: { $ne: [] } }, { reservations: { $ne: null } }] } },
        { $unwind: "$reservations" }
    ])
}

async function getOccupied() {
    return await Room.aggregate([
        { $project: {
            type: 1,
            size: 1,
            number: 1,
            occupied: 1,
            reservations: { $filter: {
                input: '$reservations',
                as: 'reservation',
                cond: { $and: [ { $lte: ['$$reservation.from', new Date(Date.now() + 60 * 60 * 24 * 1000)] }, { $gte: ['$$reservation.to', new Date(Date.now() - 60 * 60 * 24 * 1000)] }, { $ne: ['$$reservation.checkedIn', false] } ] }
            }}
        }},
        { $match: { $and: [ { reservations: { $ne: [] } }, { reservations: { $ne: null } }] } },
        { $unwind: "$reservations" }
    ])
}

async function updateReservation(room_id, reservation_id, new_room) {
    console.log(new_room);
    return await Room.update(
        {
        "_id": room_id,
        "reservations._id": reservation_id },
        {
            $set: { 
                "occupied": new_room.occupied,
                "reservations.$.checkedIn": new_room.checkedIn
            }
        }
    )
}

async function getReservation(room_id, reservation_id) {
    return await Room.findOne(
        {
        "_id": room_id,
        "reservations._id": reservation_id,
     },
     {
         "type": 1,
         "size": 1,
         "occupied": 1,
         "reserved": 1,
         "number": 1,
         "conservationDate": 1,
         "reservations.$": 1
     }
    )
}

async function deleteReservation(room_id, reservation_id) {
    return await Room.findOneAndDelete(
        {
        "_id": room_id,
        "reservations._id": reservation_id }
    )
}