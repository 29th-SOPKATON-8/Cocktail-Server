const express = require('express');
const router = express.Router();

router.post('/post', require('./suggestPOST'));

module.exports = router;