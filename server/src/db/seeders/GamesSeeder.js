import { Game } from "../../models/index.js";

class GamesSeeder {
  static async seed() {
    const gameData = [
      { title: "Starter pokemon", userId: 1 },
      { title: "Starter pokemon's second evolution", userId: 2 },
      { title: "The three legendary birds", userId: 2 },
    ];

    for (const singleGame of gameData) {
      const currentGame = await Game.query().findOne({
        title: singleGame.title,
      });
      if (!currentGame) {
        await Game.query().insert(singleGame);
      }
    }
  }
}

export default GamesSeeder;
