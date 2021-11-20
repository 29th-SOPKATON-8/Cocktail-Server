const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { postDB } = require('../../../db/post');
const { userDB } = require('../../../db/user');

module.exports = async (req, res) => { //단계별 소감들 조회
    const { id } = req.params;
    if (!id) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    let client;
    try {
      client = await db.connect(req);
      const posts = await postDB.getPostsBySuggestId(client, id);
      let result;
      /*for(post in posts){
        await userDB.getLovernameById(post['lover_id']) //lover_name가져옴
      }*/
      //해당 post의 lover_id=>join해서 lover의 name까지 return해야함
      res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_ONE_POST_SUCCESS, posts));
    } catch (error) {
      functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
      console.log(error);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
      client.release();
    }

}