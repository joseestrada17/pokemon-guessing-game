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
    const { Prompt, Vote } = require("./index.js");
    return {
      prompts: {
        relation: Model.HasManyRelation,
        modelClass: Prompt,
        join: {
          from: "games.id",
          to: "prompts.gameId",
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "games.id",
          to: "votes.gameId",
        },
      },
    };
  }
}

module.exports = Game;
