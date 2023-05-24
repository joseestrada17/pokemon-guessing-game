import express from "express";
import fetch from "node-fetch";
import { Prompt } from "../../../models/index.js";

const promptsRouter = new express.Router();

promptsRouter.get("/", async (req, res) => {
  try {
    const prompts = await Prompt.query();

    return res.status(200).json({ prompts });
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
});

promptsRouter.post("/", async (req, res) => {
  try {
    const pokemonName = req.body.pokemonName;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await response.json();

    const correctPokemonApiId = pokemonData.id;
    const correctPokemonName = pokemonData.name;

    const prompt = await Prompt.query().insert({
      correctPokemonApiId: correctPokemonApiId,
      correctPokemonName: correctPokemonName,
      gameId: req.body.gameId,
    });

    return res.status(200).json({ prompt });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

promptsRouter.get("/pokemon", async (req, res) => {
  try {
    const searchInput = req.query.s;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`);
    const data = await response.json();
    const pokemonNames = data.results.map((pokemon) => pokemon.name);

    const suggestions = pokemonNames.filter((name) =>
      name.toLowerCase().startsWith(searchInput.toLowerCase())
    );

    return res.status(200).json({ suggestions });
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
});

export default promptsRouter;
