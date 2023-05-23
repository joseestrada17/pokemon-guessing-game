const { Model } = require("objection");

class Game extends Model {
  static get tableName() {
    return "games";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        title: {
          type: "string",
        },
      },
    };
  }
  static get relationMappings() {
    const { Prompt } = require("./index.js");
    return {
      prompts: {
        relation: Model.HasManyRelation,
        modelClass: Prompt,
        join: {
          from: "games.id",
          to: "prompts.gameId",
        },
      },
    };
  }
}

module.exports = Game;