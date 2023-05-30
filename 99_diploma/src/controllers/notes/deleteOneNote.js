const { deleteOneNote } = require('../../db');
module.exports = async (user_id, id) => {
  return deleteOneNote(user_id, id);
};
