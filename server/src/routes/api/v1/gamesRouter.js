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

export default gamesRouter;
