const express = require('express');
const router = express.Router();

router.get('/post/:id', require('./postIdGET'));
//단계별 소감들 조회
module.exports = router;