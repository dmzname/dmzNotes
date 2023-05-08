const path = require('path');
const fs = require('fs');
const db = require('../../connect');
const hashedPw = require(`@src/utils/hashedPw`);
const sql = fs.readFileSync(path.join(__dirname, '../../../sql/usersQueries.sql')).toString();
const createUserSql = sql.split(';')[1];

module.exports = async (username, password) => {
  const password_hash = await hashedPw(password);
  return db.raw(createUserSql, { username, password_hash });
};
