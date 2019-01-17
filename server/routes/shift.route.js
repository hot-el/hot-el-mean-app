const express = require('express');
const asyncHandler = require('express-async-handler');
const shiftCtrl = require('../controllers/shift.controller');
var Shift = require('../models/shift.model');

const router = express.Router();
module.exports = router;

router.route('/')
    .post(asyncHandler(insert))
    .get(asyncHandler(getAllShifts));

router.route('/:id')
    .get(asyncHandler(getShiftsByUserId));


async function insert(req, res) {
    let shift= await shiftCtrl.insert(req.body);
    res.json(shift);
}

async function getAllShifts(req, res) {
    let shifts = await shiftCtrl.getAllShifts();
    res.json(shifts);
}

async function getShiftsByUserId(req, res) {
    console.log(req.params.id);
    let shift = await shiftCtrl.getShiftsByUserId(req.params.id);
    res.json(shift);
}

router.delete('/:id', function(req, res, next) {
    Shift.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
