const express = require('express');
const router = express.Router();

router.get('/:id', require('./suggestIdGET'));

module.exports = router;