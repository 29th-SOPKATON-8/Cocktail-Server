const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getSuggestById = async (client, suggestId) => { //단계별 제안 조회
  const { rows } = await client.query(
    `
    SELECT * FROM suggest s
    WHERE id = $1
    `,
    [suggestId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};


module.exports = { getSuggestById };