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
    .get(asyncHandler(getRoomById));

router.route('/c/:category')
    .get(asyncHandler(getRoomsByCategory));

router.route('/cs/:category/:size')
    .get(asyncHandler(getRoomsByCategoryAndSize));

async function insert(req, res) {
    let room = await roomCtrl.insert(req.body);
    res.json(room);
}

async function getAllRooms(req, res) {
    let rooms = await roomCtrl.getAllRooms();
    res.json(rooms);
}

async function getRoomsByCategory(req, res) {
    console.log(req.params);
    let rooms = await roomCtrl.getRoomsByCategory(req.params.category);
    res.json(rooms);
}

async function getRoomsByCategoryAndSize(req, res) {
    let rooms = await roomCtrl.getRoomsByCategoryAndSize(req.params.category, req.params.size);
    res.json(rooms);
}

async function getRoomById(req, res) {
    console.log(req.params.id);
    let room = await roomCtrl.getRoomById(req.params.id);
    res.json(room);
}

router.delete('/:id', function(req, res, next) {
    Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

router.put('/:id', function(req, res, next) {
    Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });