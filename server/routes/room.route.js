const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const roomCtrl = require('../controllers/room.controller');
var Room = require('../models/room.model');

const router = express.Router();
module.exports = router;

//router.use(passport.authenticate('jwt', {session: false}))

router.route('/')
    .post(asyncHandler(insert))
    .get(asyncHandler(getAllRooms));

router.route('/:id')
    .get(asyncHandler(getRoomById))
    .put(asyncHandler(update));

router.route('/change/:room_id/:reservation_id')
    .put(asyncHandler(updateReservation))
    .get(asyncHandler(getReservation))
    .delete(asyncHandler(removeReservationFromRoom));

router.route('/c/:category')
    .get(asyncHandler(getRoomsByCategory));

router.route('/cs/:category/:size')
    .get(asyncHandler(getRoomsByCategoryAndSize));

router.route('/csro/:category/:size/:reserved/:occupied')
    .get(asyncHandler(getRoomsByCategorySizeReservedAndOccupied));

router.route('/cro/:category/:reserved/:occupied')
    .get(asyncHandler(getRoomsByCategoryReservedAndOccupied));

router.route('/o/:occupied')
    .get(asyncHandler(getRoomsByOccupied));

router.route('/r/:reserved')
    .get(asyncHandler(getRoomsByReserved));

router.route('/reservations/all')
    .get(asyncHandler(getReservations));   

router.route('/occupied/occupied')
    .get(asyncHandler(getOccupied));  

router.route('/reservations/active')
    .get(asyncHandler(getActiveReservations)); 

router.route('/ro/:reserved/:occupied')
    .get(asyncHandler(getFreeRooms));

router.route('/free-rooms/:from/:to')
    .get(asyncHandler(getFreeRoomsInPeriod));

router.route('/free-rooms/:from/:to/:size')
    .get(asyncHandler(getFreeRoomsInPeriodBySize));

router.route('/free-rooms/:from/:to/:size/:type')
    .get(asyncHandler(getFreeRoomsInPeriodBySizeAndType));

router.route('/add-reservation/:id')
    .put(asyncHandler(addReservationToRoom));

async function insert(req, res) {
    let room = await roomCtrl.insert(req.body);
    res.json(room);
}

async function getAllRooms(req, res) {
    let rooms = await roomCtrl.getAllRooms();
    res.json(rooms);
}

async function getRoomsByCategory(req, res) {
    let rooms = await roomCtrl.getRoomsByCategory(req.params.category);
    res.json(rooms);
}

async function getRoomsByCategoryAndSize(req, res) {
    let rooms = await roomCtrl.getRoomsByCategoryAndSize(req.params.category, req.params.size);
    res.json(rooms);
}

async function getRoomsByCategorySizeReservedAndOccupied(req, res) {
    let rooms = await roomCtrl.getRoomsByCategorySizeReservedAndOccupied(req.params.category, req.params.size, req.params.reserved,req.params.occupied);
    res.json(rooms);
}

async function getRoomsByCategoryReservedAndOccupied(req, res) {
    let rooms = await roomCtrl.getRoomsByCategoryReservedAndOccupied(req.params.category, req.params.reserved, req.params.occupied);
    res.json(rooms);
}

async function getRoomsByOccupied(req, res) {
    let rooms = await roomCtrl.getRoomsByOccupied(req.params.occupied);
    res.json(rooms);
}

async function getRoomsByReserved(req, res) {
    let rooms = await roomCtrl.getRoomsByReserved(req.params.reserved);
    res.json(rooms);
}

async function getRoomById(req, res) {
    let room = await roomCtrl.getRoomById(req.params.id);
    res.json(room);
}

async function getFreeRooms(req, res) {
    let room = await roomCtrl.getFreeRooms(req.params.reserved, req.params.occupied);
    res.json(room);
}

router.delete('/:id', function(req, res, next) {
    Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


async function update(req, res) {
    console.log('update room');
    let room = await roomCtrl.update(req.params.id, req.body);
    res.json(room);
}

async function getFreeRoomsInPeriod(req, res) {
    console.log('getFreeRoomsInPeriod');
    console.log(req.params.from, req.params.to);
    let rooms = await roomCtrl.getAllFreeRoomsInPeriod(req.params.from, req.params.to);
    res.json(rooms);
}

async function getFreeRoomsInPeriodBySize(req, res) {
    console.log('getFreeRoomsInPeriodBySize');
    console.log(req.params.from, req.params.to);
    let rooms = await roomCtrl.getAllFreeRoomsInPeriodBySize(req.params.from, req.params.to, req.params.size);
    res.json(rooms);
}

async function getFreeRoomsInPeriodBySizeAndType(req, res) {
    console.log('getFreeRoomsInPeriodBySize');
    console.log(req.params.from, req.params.to);
    let rooms = await roomCtrl.getAllFreeRoomsInPeriodBySizeAndType(req.params.from, req.params.to, req.params.size, req.params.type);
    res.json(rooms);
}

async function addReservationToRoom(req, res) {
    console.log('NEW RESERVATION');
    let room = await roomCtrl.getRoomById(req.params.id);
    room.reservations.push(req.body);
    room.save();
    res.json(room);
}


async function removeReservationFromRoom(req, res) {
    console.log("EJJJJJ")
    console.log(req.params.room_id, req.params.reservation_id)
    let room = await Room.findById(req.params.room_id);
    room.reservations = room.reservations.filter(reservation => {
        reservation._id !== req.params.reservation_id
    });
    room.occupied = false;
    await room.save();
    console.log(room);
    res.json(room);
    // return await Room.updateOne( { "_id": req.params.room_id }, { $pull: { "reservations": { "_id": req.params.reservation_id } }} )
}

async function getReservations(req, res) {
    console.log('getReservations');
    let rooms = await roomCtrl.getReservations();
    res.json(rooms);
}

async function getActiveReservations(req, res) {
    console.log('getActiveReservations');
    let rooms = await roomCtrl.getActiveReservations();
    res.json(rooms);
}

async function getOccupied(req, res) {
    console.log('getOccupied');
    let rooms = await roomCtrl.getOccupied();
    res.json(rooms);
}

async function updateReservation(req, res) {
    console.log('update reservation');
    let room = await roomCtrl.updateReservation(req.params.room_id, req.params.reservation_id, req.body);
    res.json(room);
}

async function getReservation(req, res) {
    console.log('get reservation');
    let room = await roomCtrl.getReservation(req.params.room_id, req.params.reservation_id);
    res.json(room);
}

async function deleteReservation(req, res) {
    console.log('update reservation');
    let room = await roomCtrl.deleteReservation(req.params.room_id, req.params.reservation_id);
    res.json(room);
}