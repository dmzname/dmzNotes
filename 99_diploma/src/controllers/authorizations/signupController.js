const path = require('path');
const fs = require('fs');
const db = require('@src/db/connect');
const createSession = require('./createSession');
const { findUserByUserName } = require(`@src/db`);
const { hashedPassword } = require(`@src/utils`);

const sql = fs
  .readFileSync(path.join(__dirname, '../../sql/usersQueries.sql'))
  .toString()
  .split(';')[1];

module.exports = async (username, password) => {
  const user = await findUserByUserName(username);
  if (user) {
    throw new Error('Failed to add user. Username is taken');
  }

  const hash = await hashedPassword(password);
  const { rows } = await db.raw(sql, { username, hash });

  return createSession(rows[0].user_id);
};
