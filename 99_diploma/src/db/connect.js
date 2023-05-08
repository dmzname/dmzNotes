require('dotenv').config();
const knexConfig = require('../../knexfile');

module.exports = require('knex')(knexConfig);
