import express from "express";
import fetch from "node-fetch";
import { Pokemon } from "../../../models/index.js";

const pokemonsRouter = new express.Router();

pokemonsRouter.get("/", async (req, res) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const data = await response.json();
    const pokemonList = data.results;

    const pokemons = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();

        const speciesName = pokemonData.species.name;
        const pokedexNumber = pokemonData.id;
        const types = pokemonData.types.map((type) => type.type.name);
        const imageUrl = pokemonData.sprites.front_default;

        return {
          speciesName,
          pokedexNumber,
          types,
          imageUrl,
        };
      })
    );

    return res.set({ "Content-Type": "application/json" }).status(200).json({ pokemons });
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
});

export default pokemonsRouter;
