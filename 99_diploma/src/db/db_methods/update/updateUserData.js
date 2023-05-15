const path = require('path');
const fs = require('fs');
const db = require('../../connect');
const sql = fs.readFileSync(path.join(__dirname, '../../../sql/usersQueries.sql')).toString();
const updateUserDataSql = sql.split(';')[2];

module.exports = async (userData) => {
  const { user_id, username, password } = userData;
  return db.raw(updateUserDataSql, { user_id, username, password });
};
