const db = require('../../db/connect');

module.exports = async ({ id, user_id }) => {
  return db.raw(
    `
        SELECT *
        FROM notes
        WHERE note_id = :id AND user_id = :user_id;
    `,
    { id, user_id },
  );
};
