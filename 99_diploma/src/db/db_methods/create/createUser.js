const path = require('path');
const fs = require('fs');
const db = require('../../connect');
const sql = fs.readFileSync(path.join(__dirname, '../../../sql/usersQueries.sql')).toString();
const createUserSql = sql.split(';')[1];

module.exports = async (username, password) => {
  return db.raw(createUserSql, { username, password });
};
