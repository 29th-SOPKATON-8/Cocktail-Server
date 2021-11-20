const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const addLover = async (client, name) => {
    const { rows } = await client.query(
        `
        INSERT INTO lover
        (name)
        VALUES
        ($1)
        RETURNING *
        `
        [name]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
}
const getLovernameById = async (client, loverId) => {
    const { rows } = await client.query(
        `
        SELECT name FROM lover
        JOIN post ON lover.id=post.lover_id 
        WHERE id = $1
        `,
        [loverId],
    );
    return convertSnakeToCamel.keysToCamel(rows);
};
module.exports = { addPost,getLovernameById };
