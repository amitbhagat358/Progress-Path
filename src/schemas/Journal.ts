import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const JournalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

JournalSchema.index({ date: 1 }, { unique: true });

const Journal =
  mongoose.models?.Journal || mongoose.model("Journal", JournalSchema);

export default Journal;
