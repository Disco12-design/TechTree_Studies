import express from "express";
import {
  getProfile,
  createProfile,
  updateProfile,
} from "../Controllers/ProfileController.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";

const profileRouter = express.Router();

profileRouter.use(requireAuthentication);
profileRouter.post("/create-user", createProfile);
profileRouter.get("/get-user", getProfile);
profileRouter.put("/update-user", updateProfile);

export default profileRouter;
