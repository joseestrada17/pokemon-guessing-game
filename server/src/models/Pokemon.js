const Model = require("./Model");

class Pokemon extends Model {
  static get tableName() {
    return "pokemons";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["pokedexNumber", "speciesName"],
      properties: {
        pokedexNumber: {
          type: ["integer", "string"],
        },
        speciesName: {
          type: "string",
        },
        type: {
          type: "string",
        },
        imageUrl: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Pokemon;
