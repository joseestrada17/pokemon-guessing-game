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
}

module.exports = Game;
