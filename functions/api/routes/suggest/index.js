const express = require('express');
const router = express.Router();

router.get('/:id', require('./suggestIdGET')); //?��계별 질문 ?��?�� 조회

module.exports = router;