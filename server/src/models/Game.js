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
  static get relationMappings() {
    const { Guess } = require("./index.js");

    return {
      guesses: {
        relation: Model.HasManyRelation,
        modelClass: Guess,
        join: {
          from: "games.id",
          to: "guesses.gameId",
        },
      },
    };
  }
}

module.exports = Game;
