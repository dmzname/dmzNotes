const path = require('path');
const fs = require('fs');
const db = require('@src/db/connect');

const sql = fs
  .readFileSync(path.join(__dirname, '../../sql/notesQueries.sql'))
  .toString()
  .split(';')[4];

module.exports = async ({ user_id, page }) => {
  return db.raw(sql, { user_id, page });
};
