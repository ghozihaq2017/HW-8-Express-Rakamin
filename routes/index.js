// setup router
const express = require('express');

// Grouping Endpoints
const router = express.Router();
const filmRouter = require('./film.route.js');
const categoryRouter = require('./category.route.js');

router.use('/films', filmRouter);
router.use('/category', categoryRouter);

module.exports = router;
