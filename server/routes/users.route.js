var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

// router.use(passport.authenticate('jwt', { session: false }))

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
    console.log(user);
    res.json(user);
  }

/* GET ALL Users by Admin*/
router.get('/admin', function(req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET ALL Users*/
router.get('/', function(req, res, next) {
    User.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });

/* GET ALL Users by Manager*/
router.get('/manager', function(req, res, next) {
    User.find({roles: {$nin: ['Admin']}}).exec(function (err, products) {
        if (err) return next(err);
        res.json(products);
      });
//     User.find(function (err, products) {
//       if (err) return next(err);
//       res.json(products);
//     });
  });

/* GET SINGLE UserBY ID */
router.get('/:id', function(req, res, next) {
//   User.find().where('_id').equals(req.params.id).exec(function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// /* SAVE User*/
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// router.route('/manager/:id')
// .put(asyncHandler(updateByManager));

// router.route('/admin/:id')
// .put(asyncHandler(updateByAdmin));

// async function updateByAdmin(req, res) {
//   // let user = await userCtrl.updateByAdmin(req.body);
//   // console.log(user);
//   // console.log(req.body);
//   User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// }

router.route('/admin/:id')
.put(asyncHandler(updateByAdmin));

async function updateByAdmin(req, res) {
  let user = await userCtrl.updateByAdmin(req.body);
  console.log(user);
  // console.log(req.body);
  User.findByIdAndUpdate(req.params.id, user, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

router.route('/password/:id')
.put(asyncHandler(changePassword));

async function changePassword(req, res) {
  let user = await userCtrl.changePassword(req.body);
  console.log(user);
  User.findByIdAndUpdate(req.params.id, user, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

/* UPDATE User*/
// router.put('/admin/:id', function(req, res, next) {
//   let body = userCtrl.updateByAdmin(req.body)
//   console.log(body);
//   User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE User*/
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;