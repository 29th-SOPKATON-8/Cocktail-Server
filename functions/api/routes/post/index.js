const express = require('express');
const router = express.Router();

router.get('/suggest/:id', require('./suggestIdGET'));

module.exports = router;