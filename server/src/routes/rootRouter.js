import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import pokemonsRouter from "./api/v1/pokemonsRouter.js";
import guessesRouter from "./api/v1/guessesRouter.js";
import gamesRouter from "./api/v1/gamesRouter.js";
import promptsRouter from "./api/v1/promptsRouter.js";
import votesRouter from "./api/v1/votesRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/pokemons", pokemonsRouter);
rootRouter.use("/api/v1/games", gamesRouter);
rootRouter.use("/api/v1/guesses", guessesRouter);
rootRouter.use("/api/v1/prompts", promptsRouter);
rootRouter.use("/api/v1/votes", votesRouter);

export default rootRouter;
