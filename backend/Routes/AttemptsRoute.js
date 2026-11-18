import express from "express";
import {createAttempt,deleteAttempt,getAttempt,getAttempts,} from "../Controllers/AttemptsController.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";

const attemptsRouter = express.Router();

attemptsRouter.use(requireAuthentication);
attemptsRouter.post("/", createAttempt);
attemptsRouter.get("/", getAttempts);
attemptsRouter.get("/:id", getAttempt);
attemptsRouter.delete("/:id", deleteAttempt);

export default attemptsRouter;