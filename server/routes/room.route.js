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

router.route('/ro/:reserved/:occupied')
    .get(asyncHandler(getFreeRooms));

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