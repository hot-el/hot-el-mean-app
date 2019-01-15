const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const usersRoutes = require('./users.route');
const roomRoutes = require('./room.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/users', usersRoutes);
router.use('/room', roomRoutes);

module.exports = router;
