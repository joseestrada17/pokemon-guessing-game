const { Model } = require("objection");

class Prompt extends Model {
  static get tableName() {
    return "prompts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["correctPokemonName"],
      properties: {
        correctPokemonName: {
          type: "string",
        },
      },
    };
  }
  static get relationMappings() {
    const { Game } = require("./index.js");
    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "prompts.GameId",
          to: "games.id",
        },
      },
    };
  }
}

module.exports = Prompt;
