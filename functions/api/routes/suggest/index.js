const express = require('express');
const router = express.Router();

router.get('/:id', require('./suggestIdGET')); //?จ๊ณ๋ณ ์ง๋ฌธ ? ? ์กฐํ

module.exports = router;