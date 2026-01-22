import mongoose from "mongoose";

const scheduledEmailSchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: String,
  body: String,

  sendAt: { type: Date, required: true },

  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending"
  },

  retryCount: {
  type: Number,
  default: 0
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

scheduledEmailSchema.index({ sendAt: 1, status: 1 });

export default mongoose.model("ScheduledEmail", scheduledEmailSchema);
