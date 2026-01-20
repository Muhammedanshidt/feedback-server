import express from "express";
import {
  createFeedback,
  getFeedback,
  toggleUpvote,
} from "../controllers/feedback.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const feedbackRouter = express.Router();

/* Protected */
feedbackRouter.post("/",authMiddleware, createFeedback);
feedbackRouter.patch("/:id/vote", authMiddleware, toggleUpvote);

/* Public */
feedbackRouter.get("/", getFeedback);

export default feedbackRouter;
