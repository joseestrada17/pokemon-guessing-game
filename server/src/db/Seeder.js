/* eslint-disable no-console */
import { connection } from "../boot.js";
import PokemonsSeeder from "./seeders/PokemonsSeeder.js";

class Seeder {
  static async seed() {
    console.log("Seeding pokemons...");
    await PokemonsSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
