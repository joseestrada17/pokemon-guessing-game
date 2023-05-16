/* eslint-disable no-console */
import { connection } from "../boot.js";
import GamesSeeder from "./seeders/GamesSeeder.js";

class Seeder {
  static async seed() {
    console.log("Seeding games...");
    await GamesSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
