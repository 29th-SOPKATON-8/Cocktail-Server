const express = require('express');
const router = express.Router();

router.get('/suggest/:id', require('./suggestIdGET')); //단계별 질문 제안 조회

module.exports = router;