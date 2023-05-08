const db = require('../../connect');

module.exports = async (sessionId) => {
  return db.raw(
    `
      DELETE FROM sessions
      WHERE session_id = :sessionId
      RETURNING session_id
    `,
    { sessionId },
  );
};
