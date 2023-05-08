const path = require('path');
const fs = require('fs');
const sql = fs.readFileSync(path.join(__dirname, '../sql/createSessionsTable.sql')).toString();

exports.up = function (knex) {
  return knex.schema.raw(sql);
};

exports.down = function (knex) {
  return knex.schema.raw('DROP TABLE sessions');
};
