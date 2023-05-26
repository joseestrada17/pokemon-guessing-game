/* eslint-disable no-console */
import { connection } from "../boot.js";
import GamesSeeder from "./seeders/GamesSeeder.js";
// import PromptsSeeder from "./seeders/PromptsSeeder.js";
import UserSeeder from "./seeders/UsersSeeder.js";

class Seeder {
  static async seed() {
    console.log("Seeding users...");
    await UserSeeder.seed();

    console.log("Seeding games...");
    await GamesSeeder.seed();

    // console.log("Seeding prompts...");
    // await PromptsSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
