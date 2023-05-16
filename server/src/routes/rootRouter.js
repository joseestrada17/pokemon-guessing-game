import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import gamesRouter from "./api/v1/gamesRouter.js";
import guessesRouter from "./api/v1/guessesRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/games", gamesRouter);
rootRouter.use("/api/v1/guesses", guessesRouter);

export default rootRouter;
