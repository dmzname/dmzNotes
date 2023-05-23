const db = require('../../db/connect');
const showdown = require('showdown');
const converter = new showdown.Converter({ noHeaderId: true, tables: true });

module.exports = async ({ user_id, title, text, id }) => {
  const html = converter.makeHtml(text);
  return db.raw(
    `
        UPDATE notes
        SET title = :title, text = :text, html = :html
        WHERE note_id = :id AND user_id = :user_id
        RETURNING *;
    `,
    { title, text, html, id, user_id },
  );
};
