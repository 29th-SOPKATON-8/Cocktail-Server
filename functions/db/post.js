const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getPostsBySuggestId = async (client, suggestId) => {
    const { rows } = await client.query(
      `
      SELECT * FROM post
      WHERE suggest_id = $1
      `,
      [suggestId],
    );
    return convertSnakeToCamel.keysToCamel(rows);
  };