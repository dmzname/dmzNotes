const showdown = require('showdown');
const { createNewNote } = require('../../db');
const converter = new showdown.Converter({ noHeaderId: true, tables: true });

module.exports = async ({ user_id, title, text }) => {
  const html = converter.makeHtml(text);
  return createNewNote({ user_id, title, text, html });
};
