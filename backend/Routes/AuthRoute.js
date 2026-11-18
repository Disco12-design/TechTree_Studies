import express from "express";
import { getCurrentUser } from "../Controllers/AuthController.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";

const authRouter = express.Router();

authRouter.get("/me", requireAuthentication, getCurrentUser);

export default authRouter;
