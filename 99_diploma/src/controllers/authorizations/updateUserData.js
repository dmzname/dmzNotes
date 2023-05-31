const path = require('path');
const fs = require('fs');
const db = require('@src/db/connect');
const sql = fs
  .readFileSync(path.join(__dirname, '../../sql/usersQueries.sql'))
  .toString()
  .split(';')[2];

module.exports = async (userData) => {
  const { user_id, username, password } = userData;
  return db.raw(sql, { user_id, username, password });
};
