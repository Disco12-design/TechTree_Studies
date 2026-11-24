import express from "express";
import { getPBQAttempts, savePBQAttempt } from "../Controllers/PBQController.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";

const pbqRouter = express.Router();

pbqRouter.use(requireAuthentication);
pbqRouter.get("/attempts", getPBQAttempts);
pbqRouter.put("/:pbqId/attempt", savePBQAttempt);

export default pbqRouter;
