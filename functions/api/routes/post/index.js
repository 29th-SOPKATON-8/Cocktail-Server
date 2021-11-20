const express = require('express');
const router = express.Router();

router.get('/post/:id', require('./postIdGET'));
router.post('/post', require('./postSuggestPOST'));

module.exports = router;