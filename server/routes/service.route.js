const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const serviceCtrl = require('../controllers/service.controller');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', {session: false}));

router.route('/')
    .post(asyncHandler(insert))
    .get(asyncHandler(getAll));

router.route('/:id')
    .put(asyncHandler(update))
    .delete(asyncHandler(deleteById))
    .get(asyncHandler(getById));


async function insert(req, res) {
    let service = await serviceCtrl.insert(req.body);
    res.json(service);
}

async function getAll(req, res) {
    let services = await serviceCtrl.getAllServices();
    res.json(services);
}

async function getById(req, res) {
    let service = await serviceCtrl.getServiceById(req.params.id);
    res.json(service);
}

async function update(req, res) {
    let service = await serviceCtrl.update(req.params.id, req.body);
    res.json(service);
}

async function deleteById(req, res, next) {
    await serviceCtrl.deleteById(req.params.id);
    res.send('Deleted service: '.concat(req.params.id));
    next()
}

async function getByName(req, res) {
    let services = await serviceCtrl.getByNamePartial(req.params.name);
    res.json(services);
}