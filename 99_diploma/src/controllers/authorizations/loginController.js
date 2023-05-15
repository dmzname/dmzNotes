const { findUserByUserName, createSession } = require(`@src/db`);
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByUserName(username);
    if (!user) {
      return res.cookie('authError', 'The username or password is incorrect').redirect('/');
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.cookie('authError', 'The username or password is incorrect').redirect('/');
    }

    const session_id = await createSession(user.user_id);

    return res.cookie('sessionId', session_id).redirect('/dashboard');
  } catch (err) {
    console.log(err.message);
    res.cookie('authError', 'There is a server error. Please try again later.').redirect('/');
  }
};
