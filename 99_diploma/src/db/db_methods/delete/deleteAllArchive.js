const db = require('../../connect');

module.exports = async (user_id) => {
  return db.raw(
    `
      DELETE FROM notes
      WHERE user_id = :user_id AND is_archive = true;
    `,
    { user_id },
  );
};
