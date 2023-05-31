const path = require('path');
const fs = require('fs');
const db = require('@src/db/connect');

const sql = fs
  .readFileSync(path.join(__dirname, '../../sql/notesQueries.sql'))
  .toString()
  .split(';')[2];

module.exports = async ({ id, user_id }) => {
  return db.raw(sql, { id, user_id });
};
