const { deleteSession } = require('../../db');

module.exports = async (req, res) => {
  deleteSession(req.sessionId).then(() => {
    res.clearCookie('sessionId').redirect('/');
  });
};
