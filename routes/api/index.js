const router = require('express').Router();
const headlineRoutes = require('./headline');

router.use('/headlines', headlineRoutes);

module.exports = router;
