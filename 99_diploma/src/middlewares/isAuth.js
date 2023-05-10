const { findUserBySessionId } = require(`@src/db`);

module.exports = async (req, res, next) => {
  if (!req.cookies['sessionId']) {
    const authError = req.cookies['authError'];
    return res.clearCookie('authError').render('index', !authError ? null : { authError });
  }

  const { rows } = await findUserBySessionId(req.cookies['sessionId']);
  req.user = rows[0];
  req.sessionId = req.cookies['sessionId'];
  next();
};
