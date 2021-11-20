const express = require('express');
const router = express.Router();

router.get('/:id', require('./postIdGET'));
router.post('/suggest', require('./postSuggestPOST'));

module.exports = router;