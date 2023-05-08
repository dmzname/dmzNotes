const path = require('path');
const fs = require('fs');
const db = require('../../connect');
const sql = fs.readFileSync(path.join(__dirname, '../../../sql/sessionsQueries.sql')).toString();
const createSessions = sql.split(';')[0];

module.exports = async (user_id) => {
  return db.raw(createSessions, { user_id });
};
