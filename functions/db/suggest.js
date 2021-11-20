const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getSuggestById = async (client, suggestId) => { 
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