const express = require('express'),
      usersRoutes = require('./users.route'),
      colorsRoutes = require('./colors.route'),
      authRoutes = require('./auth.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at api/users
router.use('/users', usersRoutes);

// mount user routes at api/colors
router.use('/colors', colorsRoutes);

// mount auth routes at api/
router.use('/', authRoutes);

module.exports = router;
