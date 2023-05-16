/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("guesses", (table) => {
    table.bigIncrements("id");
    table.string("userGuess").notNullable();
    table.bigInteger("gameId").unsigned().references("games.id").index().notNullable();
    table.bigInteger("userId").unsigned().references("users.id").index().notNullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("guesses");
};
