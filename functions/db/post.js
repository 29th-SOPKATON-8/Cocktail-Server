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

  const postSuggestImpression = async (client, content) => {
    const { rows } = await client.query(
      `
      INSERT INTO post
      (content)
      VALUES
      ($1)
      RETURNING *
      `,
      [content]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
  }

module.exports = { getPostsBySuggestId, postSuggestImpression };