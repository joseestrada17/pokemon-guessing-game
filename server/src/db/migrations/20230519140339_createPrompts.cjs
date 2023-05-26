/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("prompts", (table) => {
    table.bigIncrements("id");
    table.string("correctPokemonName").notNullable();
    table.integer("correctPokemonApiId");
    table.string("correctPokemonImageUrl");
    table.bigInteger("gameId").unsigned().references("games.id").index().notNullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("prompts");
};
