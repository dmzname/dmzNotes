const path = require('path');
const fs = require('fs');
const db = require('../connect');
const sql = fs.readFileSync(path.join(__dirname, '../../sql/usersQueries.sql')).toString();
const findUsersSql = sql.split(';')[0];

module.exports = async (username) => {
  const {rows} = await db.raw(findUsersSql, {username});
  return rows[0];
};
