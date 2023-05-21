/* eslint-disable no-console */
import { connection } from "../boot.js";
import GamesSeeder from "./seeders/GamesSeeder.js";
import PokemonsSeeder from "./seeders/PokemonsSeeder.js";
import UserSeeder from "./seeders/UsersSeeder.js";

class Seeder {
  static async seed() {
    // console.log("Seeding pokemons...");
    // await PokemonsSeeder.seed();

    console.log("Seeding users...");
    await UserSeeder.seed();

    console.log("Seeding games...");
    await GamesSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
