const path = require('path');
const fs = require('fs');
const db = require('../../connect');
const sql = fs
  .readFileSync(path.join(__dirname, '../../../sql/notesQueries.sql'))
  .toString()
  .split(';')[2];

module.exports = async (params) => {
  return db.raw(sql, { ...params });
};
