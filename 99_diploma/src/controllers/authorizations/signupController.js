const { findUserByUserName, createUser, createSession } = require(`@src/db`);
const hashedPw = require(`@src/utils/hashedPw`);

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUserName(username);
    if (user) {
      return res.cookie('authError', 'Failed to add user. Username is taken').redirect('/');
    }
    const hash = await hashedPw(password);
    const { rows } = await createUser(username, hash);
    const session_id = await createSession(rows[0].user_id);

    return res.cookie('sessionId', session_id).redirect('/dashboard');
  } catch (err) {
    console.log(err.message);
    res.cookie('authError', 'There is a server error. Please try again later.').redirect('/');
  }
};
