const Model = require("./Model");

class Guess extends Model {
  static get tableName() {
    return "guesses";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: "userGuess",
      properties: {
        userGuess: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Guess;
