const db = require('../../db/connect');
const showdown = require('showdown');
const converter = new showdown.Converter({ noHeaderId: true, tables: true });

module.exports = async ({ user_id, title, text }) => {
  const html = converter.makeHtml(text);
  return db.raw(
    `
          INSERT INTO notes (user_id, title, text, html)
          VALUES (:user_id, :title, :text, :html)
          RETURNING *;
      `,
    { user_id, title, text, html },
  );
};
