const { getArchiveNotes } = require('../../db');

module.exports = async ({ user_id, page }) => {
  return getArchiveNotes({ user_id, page });
};
