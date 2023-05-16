import { Game } from "../../models/index.js";

class GamesSeeder {
  static async seed() {
    const gamesData = [
      {
        pokedexNumber: 7,
        speciesName: "Squirtle",
        type: "Water",
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/7.png",
      },
      {
        pokedexNumber: 25,
        speciesName: "Pikachu",
        type: "Electric",
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/25.png",
      },
      {
        pokedexNumber: 4,
        speciesName: "Charmander",
        type: "Fire",
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/4.png",
      },
      {
        pokedexNumber: 1,
        speciesName: "Bulbasaur",
        type: "Grass",
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/1.png",
      },
      {
        pokedexNumber: 10,
        speciesName: "Caterpie",
        type: "Bug",
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/10.png",
      },
      {
        pokedexNumber: 16,
        speciesName: "Pidgey",
        type: "Normal",
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/16.png",
      },
    ];

    for (const singleGame of gamesData) {
      const currentGame = await Game.query().findOne({ pokedexNumber: singleGame.pokedexNumber });
      if (!currentGame) {
        await Game.query().insert(singleGame);
      }
    }
  }
}

export default GamesSeeder;
