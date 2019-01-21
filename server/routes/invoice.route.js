const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const invoiceCtrl = require('../controllers/invoice.controller');

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
    let service = await invoiceCtrl.insert(req.body);
    res.json(service);
}

async function getAll(req, res) {
    let services = await invoiceCtrl.getAllInvoices();
    res.json(services);
}

async function getById(req, res) {
    let service = await invoiceCtrl.getInvoiceById(req.params.id);
    res.json(service);
}

async function update(req, res) {
    let service = await invoiceCtrl.update(req.params.id);
    res.json(service);
}

async function deleteById(req, res, next) {
    await invoiceCtrl.deleteById(req.params.id);
    res.json({msg: 'Deleted invoice: '.concat(req.params.id)});
}