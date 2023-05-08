const path = require('path');
const fs = require('fs');
const db = require('../connect');
const sql = fs.readFileSync(path.join(__dirname, '../../sql/sessionsQueries.sql')).toString();
const findSessionsSql = sql.split(';')[1];

module.exports = (sessionId) => {
  return db.raw(findSessionsSql, { sessionId });
};
