import {
    createFeedbackService,
    getFeedbackService,
    toggleUpvoteService,
  } from "../services/feedback.service.js";
  
  /* CREATE */
  export const createFeedback = async (req, res) => {
    console.log("first")
    try {
      const feedback = await createFeedbackService(req.body, req.user.id);
      res.status(201).json({
        message: "Feedback submitted",
        feedback,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit feedback" });
    }
  };
  
  /* VIEW + FILTER + SORT */
  export const getFeedback = async (req, res) => {
    try {
      const feedbacks = await getFeedbackService(req.query);
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  };
  
  /* UPVOTE / UNVOTE */
  export const toggleUpvote = async (req, res) => {
    try {
      const feedback = await toggleUpvoteService(
        req.params.id,
        req.user.id
      );
  
      res.json({
        message: "Vote updated",
        upvotes: feedback.upvotedBy.length,
        feedback,
      });
    } catch (error) {
      if (error.message === "FEEDBACK_NOT_FOUND") {
        return res.status(404).json({ message: "Feedback not found" });
      }
  
      res.status(500).json({ message: "Voting failed" });
    }
  };
  