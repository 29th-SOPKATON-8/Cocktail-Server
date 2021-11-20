const express = require('express');
const router = express.Router();

router.get('/suggest/:id', require('./suggestIdGET')); //?‹¨ê³„ë³„ ì§ˆë¬¸ ? œ?•ˆ ì¡°íšŒ

module.exports = router;