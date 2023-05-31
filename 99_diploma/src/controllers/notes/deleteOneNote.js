const db = require('@src/db/connect');

module.exports = async (user_id, id) => {
  return db.raw(
    `
      DELETE FROM notes
      WHERE user_id = :user_id AND is_archive = true AND note_id = :id;
    `,
    { user_id, id },
  );
};
