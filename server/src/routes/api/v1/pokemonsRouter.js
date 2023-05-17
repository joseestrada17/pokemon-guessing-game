import express from "express";
import { Pokemon } from "../../../models/index.js";

const pokemonsRouter = new express.Router();

pokemonsRouter.get("/", async (req, res) => {
  try {
    const pokemons = await Pokemon.query();
    return res.status(200).json({ pokemons });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

export default pokemonsRouter;
