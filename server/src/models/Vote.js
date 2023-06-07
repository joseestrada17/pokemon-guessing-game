const Model = require("./Model");

class Vote extends Model {
  static get tableName() {
    return "votes";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["voteValue"],
      properties: {
        votes: { type: ["string", "integer"] },
      },
    };
  }
  static get relationMappings() {
    const { Game, User } = require("./index.js");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "votes.userId",
          to: "users.id",
        },
      },
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "votes.gameId",
          to: "games.id",
        },
      },
    };
  }
}

module.exports = Vote;
