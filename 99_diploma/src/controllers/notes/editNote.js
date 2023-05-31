const path = require('path');
const db = require('@src/db/connect');
const showdown = require('showdown');
const fs = require('fs');

const converter = new showdown.Converter({ noHeaderId: true, tables: true, strikethrough: true });
const sql = fs
  .readFileSync(path.join(__dirname, '../../sql/notesQueries.sql'))
  .toString()
  .split(';')[1];

module.exports = async ({ user_id, title, text, id }) => {
  const html = converter.makeHtml(text);
  return db.raw(sql, { user_id, title, text, id, html });
};
