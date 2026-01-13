import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema({
  to: String,
  subject: String,

  status: {
    type: String,
    enum: ["sent", "failed"]
  },

  error: String,

  sentAt: {
    type: Date,
    default: Date.now
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

export default mongoose.model("EmailLog", emailLogSchema);
