const { isArchivedNote } = require('../../db');

module.exports = async ({ user_id, id }) => {
  return isArchivedNote({ user_id, id });
};
