import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    highlights: Array,
    learnings: Array,
    diaryContent: String,
    checklistData: Array,
    date: {
      type: String,
      required: true,
    },
  },
  { strict: false }
);

const Summary =
  mongoose.models.Summary || mongoose.model("Summary", SummarySchema);

export default Summary;
