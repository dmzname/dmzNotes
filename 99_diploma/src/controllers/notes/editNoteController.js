const showdown = require('showdown');
const { editNote } = require('../../db');
const converter = new showdown.Converter({ noHeaderId: true, tables: true });

module.exports = async ({ user_id, title, text, id }) => {
  const html = converter.makeHtml(text);
  return editNote({ user_id, title, text, id, html });
};
