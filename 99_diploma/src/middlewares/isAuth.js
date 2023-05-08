const { findUserBySessionId } = require(`@src/db`);

module.exports = async (req, res, next) => {
  if (!req.cookies['sessionId']) {
    return next();
  }

  const { rows } = await findUserBySessionId(req.cookies['sessionId']);
  req.user = rows[0];
  req.sessionId = req.cookies['sessionId'];
  next();
};
