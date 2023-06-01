const path = require('path');
const fs = require('fs');
const db = require('@src/db/connect');
const { markDownToHtmlConverter } = require('@src/utils');

const sql = fs
  .readFileSync(path.join(__dirname, '../../sql/notesQueries.sql'))
  .toString()
  .split(';')[0];

module.exports = async ({ user_id, title, text }) => {
  const html = markDownToHtmlConverter(text);
  return db.raw(sql, { user_id, title, text, html });
};
