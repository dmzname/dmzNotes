const { getOneNote } = require('../../db');

module.exports = async ({ id, user_id }) => {
  return getOneNote({ id, user_id });
};
