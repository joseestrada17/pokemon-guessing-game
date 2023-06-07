import express from "express";
import { Game, Prompt } from "../../../models/index.js";
import GamesSerializer from "../../../serializers/gamesSerializer.js";

const gamesRouter = new express.Router();

gamesRouter.get("/", async (req, res) => {
  try {
    const games = await Game.query();
    const serializedGames = games.map((game) => GamesSerializer.serialize(game));
    return res.status(200).json({ games: serializedGames });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

gamesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.query().findById(id);

    if (!game) {
      return res.status(404).json({ errors: "Game not found" });
    }

    const prompts = await Prompt.query().where("gameId", id);
    const serializedData = GamesSerializer.serializeWithPrompts(game, prompts);

    return res.status(200).json(serializedData);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

gamesRouter.post("/", async (req, res) => {
  const { body, user } = req;
  const formInput = body;
  const { title } = formInput;
  const userId = user.id;
  try {
    const newGame = await Game.query().insertAndFetch({ title, userId });
    const serializedGame = GamesSerializer.serialize(newGame);

    return res.status(201).json(serializedGame);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data });
    } else {
      res.status(500).json({ errors: error.message });
    }
  }
});

export default gamesRouter;
