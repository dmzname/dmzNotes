const path = require('path');
const fs = require('fs');
const db = require('../../connect');
const sql = fs.readFileSync(path.join(__dirname, '../../../sql/sessionsQueries.sql')).toString();
const createSessionSql = sql.split(';')[0];

module.exports = async (user_id) => {
  const result = await db.raw(createSessionSql, { user_id });
  const { session_id } = result.rows[0];
  return session_id;
};
