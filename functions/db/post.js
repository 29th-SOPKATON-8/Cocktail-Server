const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getPostsBySuggestId = async (client, suggestId) => {
    const { rows } = await client.query(
      `
      SELECT content,name FROM post
      JOIN lover ON lover.id=post.lover_id 
      WHERE suggest_id = $1
      `,
      [suggestId],
    );
    return convertSnakeToCamel.keysToCamel(rows);
  };

  const postSuggestImpression = async (client, suggest_id, content) => {
    const { rows } = await client.query(
      `
      INSERT INTO post
      (suggest_id, content)
      VALUES
      ($1, $2)
      RETURNING *
      `,
      [suggest_id, content]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
  }

module.exports = { getPostsBySuggestId, postSuggestImpression };
