var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

router.route('/manager')
  .post(asyncHandler(insertByManager));

router.route('/admin')
  .post(asyncHandler(insertByAdmin));

async function insertByManager(req, res) {
  let user = await userCtrl.insertByManager(req.body);
  res.json(user);
}

async function insertByAdmin(req, res) {
    let user = await userCtrl.insertByAdmin(req.body);
    res.json(user);
  }

router.get('/admin', function(req, res, next) {
  User.find().sort({roles: 1}).exec(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/', function(req, res, next) {
    User.find().sort({roles: 1}).exec(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });

router.get('/manager', function(req, res, next) {
    User.find({roles: {$nin: ['Admin']}}).sort({roles: 1}).exec(function (err, products) {
        if (err) return next(err);
        res.json(products);
      });
  });

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.route('/admin/:id')
.put(asyncHandler(updateByAdmin));

async function updateByAdmin(req, res) {
  let user = await userCtrl.updateByAdmin(req.body);
  User.findByIdAndUpdate(req.params.id, user, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

router.route('/password/:id')
.put(asyncHandler(changePassword));

async function changePassword(req, res) {
  let user = await userCtrl.changePassword(req.body);
  User.findByIdAndUpdate(req.params.id, user, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/checkEmailNotTaken', (req, res, next) => {
  const userId = req.body.userId;

  User.findOne({email: req.body.email})
    .then(user => {
      // No user with the same email in the database
      if (!user) {
        return res.json({
          emailNotTaken: true
        });
      }

      // Validate the 'edit user' form
      if (userId) {
        if (userId === user._id.toString()) {
          return res.json({
            emailNotTaken: true
          })
        } else {
          return res.json({
            emailNotTaken: false
          })
        }
      }
      // Validate the 'create user' form
      else {
        res.json({
          emailNotTaken: false
        })
      }
    })
    .catch(error => {
      res.json({
        emailNotTaken: true
      })
    });
});

module.exports = router;