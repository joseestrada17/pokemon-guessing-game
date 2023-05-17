/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("pokemons", (table) => {
    table.bigIncrements("id");
    table.integer("pokedexNumber").notNullable();
    table.string("speciesName").notNullable();
    table.string("type");
    table.string("imageUrl");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("pokemons");
};
