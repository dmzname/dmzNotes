exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username", 255).notNullable().unique();
    table.string("email", 255).notNullable().unique();
    table.string("password_hash", 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
