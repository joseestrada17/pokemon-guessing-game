import express from "express";
import { Game, Vote } from "../../../models/index.js";
import { ValidationError } from "objection";
import GamesSerializer from "../../../serializers/gamesSerializer.js";

const votesRouter = new express.Router();

votesRouter.get("/", async (req, res) => {
  try {
    const votes = await Vote.query();
    return res.status(200).json({ votes });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
});

votesRouter.post("/", async (req, res) => {
  const voteValue = req.body.voteValue;
  const gameId = req.body.gameId;
  const userId = req.user.id;
  try {
    const voteExists = await Vote.query().findOne({
      userId: userId,
      gameId: gameId,
    });
    if (voteExists) {
      if (voteValue === voteExists.voteValue) {
        await Vote.query().deleteById(voteExists.id);
      } else {
        await voteExists.$query().patch({ voteValue: -voteValue });
      }
    } else {
      const newVote = await Vote.query().insertAndFetch({ voteValue, userId, gameId });
    }
    const game = await Game.query().findById(gameId);
    const serializedGame = GamesSerializer.serialize(game);
    const voteCountForGame = await Vote.query()
      .where({ gameId })
      .sum("voteValue as voteCount")
      .first();
    const updatedGame = { ...serializedGame, voteCount: voteCountForGame.voteCount };
    return res.status(201).json({ vote: updatedGame.voteCount });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data });
    } else {
      res.status(500).json({ errors: error.message });
    }
  }
});

export default votesRouter;
