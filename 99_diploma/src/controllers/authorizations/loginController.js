const { findUserByUserName, createSession } = require(`@src/db`);
const bcrypt = require('bcrypt');

module.exports = async (username, password) => {
  const user = await findUserByUserName(username);
  if (!user) {
    throw new Error('The username or password is incorrect');
  }

  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) {
    throw new Error('The username or password is incorrect');
  }

  return createSession(user.user_id);
};
