import express from "express";
import { Game } from "../../../models/index.js";

const gamesRouter = new express.Router();

gamesRouter.get("/", async (req, res) => {
  try {
    const games = await Game.query();
    return res.status(200).json({ games });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

gamesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.query().findById(id);
    return res.status(200).json({ game: game });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

gamesRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = body;
  const { title } = formInput;
  const userId = req.user.id;
  try {
    const newGame = await Game.query().insertAndFetch({ title, userId });

    return res.status(201).json({ newGame });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data });
    } else {
      res.status(500).json({ errors: error.message });
    }
  }
});

export default gamesRouter;
