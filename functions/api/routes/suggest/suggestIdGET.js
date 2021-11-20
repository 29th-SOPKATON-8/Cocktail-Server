const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { suggestDB } = require('../../../db/suggest');

module.exports = async (req, res) => { //단계별 소감들 조회
    const { id } = req.params;
    if (!id) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    let client;
    try {
      client = await db.connect(req);
      const suggest = await suggestDB.getSuggestById(client, id);
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_ONE_SUGGEST_SUCCESS, suggest));
    } catch (error) {
      functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
      console.log(error);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
      client.release();
    }

}