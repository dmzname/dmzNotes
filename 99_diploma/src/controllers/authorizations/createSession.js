const path = require('path');
const fs = require('fs');
const db = require('@src/db/connect');
const sql = fs
  .readFileSync(path.join(__dirname, '../../sql/sessionsQueries.sql'))
  .toString()
  .split(';')[0];

module.exports = async (user_id) => {
  const result = await db.raw(sql, { user_id });
  const { session_id } = result.rows[0];
  return session_id;
};
