const express = require('express');
const router = express.Router();

router.post('/trash', require('./trashPOST'));

module.exports = router;