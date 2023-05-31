const path = require('path');
const fs = require('fs');
const db = require('@src/db/connect');
const showdown = require('showdown');

const converter = new showdown.Converter({ noHeaderId: true, tables: true });
const sql = fs
  .readFileSync(path.join(__dirname, '../../sql/notesQueries.sql'))
  .toString()
  .split(';')[0];

module.exports = async ({ user_id, title, text }) => {
  const html = converter.makeHtml(text);
  return db.raw(sql, { user_id, title, text, html });
};
