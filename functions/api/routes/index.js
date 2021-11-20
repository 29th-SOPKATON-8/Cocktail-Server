const express = require('express');
const router = express.Router();

router.use('/lover', require('./lover'));
router.use('/post', require('./post'));
router.use('/suggest', require('./suggest'));

module.exports = router;