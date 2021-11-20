const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getPostsBySuggestId = async (client, suggestId) => {
    const { rows } = await client.query(
      `
      SELECT content,lover_id FROM post
      JOIN lover ON lover.id=post.lover_id 
      WHERE suggest_id = $1
      `,
      [suggestId],
    );
    return convertSnakeToCamel.keysToCamel(rows);
  };


module.exports={getPostsBySuggestId}