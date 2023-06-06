const path = require('path');
const db = require('@src/db/connect');
const fs = require('fs');

const sql = fs
  .readFileSync(path.join(__dirname, '../../sql/notesQueries.sql'))
  .toString()
  .split(';')[3];

module.exports = async ({ user_id, page, age, search }) => {
  return db.raw(sql, { user_id, page, age, search });
};
