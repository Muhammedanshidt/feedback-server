import Feedback from "../model/Feedback.model.js";

/* CREATE FEEDBACK */
export const createFeedbackService = async (data, userId) => {
  return await Feedback.create({
    ...data,
    createdBy: userId,
  });
};

/* GET FEEDBACK (FILTER + SORT) */
export const getFeedbackService = async ({ category, sort }) => {
  const query = {};

  if (category) {
    query.category = category;
  }

  let sortOption = { createdAt: -1 }; // Newest first (default)

  if (sort === "upvotes") {
    sortOption = { "upvotedBy.length": -1 }; // handled in controller
  }

  const feedbacks = await Feedback.find(query).lean();

  // Sort by upvotes manually (Mongo can't sort by array length directly)
  if (sort === "upvotes") {
    feedbacks.sort((a, b) => b.upvotedBy.length - a.upvotedBy.length);
  }

  return feedbacks;
};

/* TOGGLE UPVOTE */
export const toggleUpvoteService = async (feedbackId, userId) => {
  const feedback = await Feedback.findById(feedbackId);
  if (!feedback) throw new Error("FEEDBACK_NOT_FOUND");

  const hasUpvoted = feedback.upvotedBy.includes(userId);

  if (hasUpvoted) {
    // Un-vote
    feedback.upvotedBy.pull(userId);
  } else {
    // Upvote
    feedback.upvotedBy.push(userId);
  }

  await feedback.save();
  return feedback;
};
