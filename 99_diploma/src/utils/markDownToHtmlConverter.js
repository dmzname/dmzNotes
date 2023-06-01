const showdown = require('showdown');
const converter = new showdown.Converter({ noHeaderId: true, tables: true, strikethrough: true });

module.exports = (markDown) => {
  return converter.makeHtml(markDown);
};
