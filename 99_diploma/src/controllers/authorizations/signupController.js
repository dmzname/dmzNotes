const { findUserByUserName } = require(`@src/db`);
const { hashedPassword } = require(`@src/utils`);
const createUser = require('./createUser');
const createSession = require('./createSession');

module.exports = async (username, password) => {
  const user = await findUserByUserName(username);

  if (user) {
    throw new Error('Failed to add user. Username is taken');
  }

  const hash = await hashedPassword(password);
  const { user_id } = await createUser(username, hash);

  return createSession(user_id);
};
