import mongoose from 'mongoose';

const PurposeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  purposes: [
    {
      id: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

const Purpose =
  mongoose.models.Purpose || mongoose.model('Purpose', PurposeSchema);

export default Purpose;
