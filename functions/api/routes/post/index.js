const express = require('express');
const router = express.Router();

router.get('/post/:id', require('./postIdGET'));

module.exports = router;