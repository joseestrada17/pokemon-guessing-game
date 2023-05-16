const Model = require("./Model");

class Game extends Model {
  static get tableName() {
    return "games";
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

module.exports = Game;
