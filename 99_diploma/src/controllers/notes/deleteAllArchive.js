const { deleteAllArchive } = require('../../db');
module.exports = async (user_id) => {
  return deleteAllArchive(user_id);
};
