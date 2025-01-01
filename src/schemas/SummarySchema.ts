import mongoose from 'mongoose';

const SummarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  highlights: Array,
  learnings: Array,
  diaryContent: String,
  academicData: Array,
  codingData: Array,
  personalData: Array,
  date: {
    type: String,
    required: true,
  },
});

const Summary =
  mongoose.models.Summary || mongoose.model('Summary', SummarySchema);

export default Summary;
