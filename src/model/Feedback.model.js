import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Bug", "Feature", "UI", "Improvement"],
      required: true,
    },

    // Voting system
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Virtual field (not stored in DB)
feedbackSchema.virtual("upvotes").get(function () {
  return this.upvotedBy.length;
});

feedbackSchema.set("toJSON", { virtuals: true });
feedbackSchema.set("toObject", { virtuals: true });

export default mongoose.model("Feedback", feedbackSchema);
