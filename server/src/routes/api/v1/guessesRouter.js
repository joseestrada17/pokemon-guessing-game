import express from "express";
import { Guess } from "../../../models/index.js";

const guessesRouter = new express.Router();

guessesRouter.get("/", async (req, res) => {
  try {
    const currentUser = req.user;
    const relatedGuesses = await currentUser.$relatedQuery("guesses");
    const guesses = await relatedGuesses;

    return res.status(200).json({ guesses });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

export default guessesRouter;
