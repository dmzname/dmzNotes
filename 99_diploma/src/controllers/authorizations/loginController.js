const { findUserByUserName, createSession } = require('../../db');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByUserName(username);
    if (!user) {
      return res
        .cookie('authError', 'Invalid username or password', { httpOnly: true })
        .status(401)
        .redirect('/');
    }
    const isValidPass = await bcrypt.compare(password, user.password_hash);
    if (!isValidPass) {
      return res
        .cookie('authError', 'Invalid username or password', { httpOnly: true })
        .status(401)
        .redirect('/');
    }

    const result = await createSession(user.user_id);
    const { session_id } = result.rows[0];

    return res
      .cookie('sessionId', session_id, { httpOnly: true })
      .status(201)
      .redirect('/dashboard');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
