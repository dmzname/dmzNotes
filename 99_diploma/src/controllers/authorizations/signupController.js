const { findUserByUserName, createUser, createSession } = require(`@src/db`);

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUserName(username);
    if (user) {
      return res.cookie('authError', 'Failed to add user. Username is taken').redirect('/');
    }
    const { rows } = await createUser(username, password);
    const result = await createSession(rows[0].user_id);
    const { session_id } = result.rows[0];

    return res.cookie('sessionId', session_id).redirect('/dashboard');
  } catch (err) {
    console.log(err.message);
    res.cookie('authError', 'There is a server error. Please try again later.').redirect('/');
  }
};
