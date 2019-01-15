const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const roomRoutes = require('./room.route');
const invoiceRoutes = require('./invoice.route');
const serviceRoutes = require('./service.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/room', roomRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/service', serviceRoutes);

module.exports = router;
