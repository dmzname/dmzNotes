const { findUserByUserName, createUser, createSession } = require(`@src/db`);
const { hashedPassword } = require(`@src/utils`);

module.exports = async (username, password) => {
  const user = await findUserByUserName(username);
  if (user) {
    throw new Error('Failed to add user. Username is taken');
  }

  const hash = await hashedPassword(password);

  const { rows } = await createUser(username, hash);
  const result = await createSession(rows[0].user_id);

  return result.rows[0];
};
