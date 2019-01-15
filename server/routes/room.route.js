const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const roomCtrl = require('../controllers/room.controller');

const router = express.Router();
module.exports = router;

//router.use(passport.authenticate('jwt', {session: false}))

router.route('/')
    .post(asyncHandler(insert))
    .get(asyncHandler(getAllRooms));

async function insert(req, res) {
    let room = await roomCtrl.insert(req.body);
    res.json(room);
}

async function getAllRooms(req, res) {
    let rooms = await roomCtrl.getAllRooms();
    res.json(rooms);
}