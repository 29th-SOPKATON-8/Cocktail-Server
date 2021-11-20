const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const addPost = async (client, name) => {
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
