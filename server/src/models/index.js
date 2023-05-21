// include all of your models here using CommonJS requires
const User = require("./User.js");
const Pokemon = require("./Pokemon.js");
const Guess = require("./Guess.js");
const Game = require("./Game");
const Prompt = require("./Prompt.js");

module.exports = { User, Pokemon, Guess, Game, Prompt };
