import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },

  emailProvider: {
    type: String,
    default: "gmail"
  },
  
  emailPassword: {
  type: String,
  required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
