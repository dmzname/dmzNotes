const { findUserByUserName, createUser, createSession } = require(`@src/db`);

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUserName(username);
    if (user) {
      return res
        .cookie('authError', 'Failed to add user. Username is taken', { httpOnly: true })
        .status(409)
        .redirect('/');
    }
    const { rows } = await createUser(username, password);
    const result = await createSession(rows[0].user_id);
    const { session_id } = result.rows[0];

    return res
      .cookie('sessionId', session_id, { httpOnly: true })
      .status(201)
      .redirect('/dashboard');
  } catch (err) {
    console.log(err);
    return res.cookie('authError', 'Server error', { httpOnly: true }).status(500).redirect('/');
  }
};
