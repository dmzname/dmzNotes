const { getAllNotes } = require('../../db');

module.exports = async ({ user_id, page, age }) => {
  return getAllNotes({ user_id, page, age });
};
