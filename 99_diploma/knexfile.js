require("dotenv").config();

module.exports = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
  },
  pool: { min: 0, max: 7 },
  migrations: {
    tableName: "knex_migrations",
  },
};
