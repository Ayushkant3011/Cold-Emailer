import mongoose from "mongoose";

const emailTemplateSchema = new mongoose.Schema({
  role: { type: String, required: true }, // Frontend Dev, Backend Dev
  subject: { type: String, required: true },
  body: { type: String, required: true },

  placeholders: [
    {
      type: String // company, name, techStack
    }
  ],

  tone: {
    type: String,
    enum: ["formal", "friendly"],
    default: "formal"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("EmailTemplate", emailTemplateSchema);
