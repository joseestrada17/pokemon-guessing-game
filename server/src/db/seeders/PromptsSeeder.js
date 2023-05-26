import { Game, Prompt } from "../../models/index.js";

class PromptsSeeder {
  static async seed() {
    const game1 = await Game.query().findById(1);
    const game2 = await Game.query().findById(2);
    const game3 = await Game.query().findById(3);

    const promptsData = [
      { correctPokemonName: "squirtle", gameId: game1.id },
      { correctPokemonName: "bulbasaur", gameId: game1.id },
      { correctPokemonName: "charmander", gameId: game1.id },
      { correctPokemonName: "wartortle", gameId: game2.id },
      { correctPokemonName: "ivysaur", gameId: game2.id },
      { correctPokemonName: "charmeleon", gameId: game2.id },
      { correctPokemonName: "articuno", gameId: game3.id },
      { correctPokemonName: "zapdos", gameId: game3.id },
      { correctPokemonName: "moltres", gameId: game3.id },
    ];
    for (const prompt of promptsData) {
      const game = await Prompt.query().findOne(prompt);
      if (!game) {
        await Prompt.query().insert(prompt);
      }
    }
  }
}

export default PromptsSeeder;
