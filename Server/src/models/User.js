import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    emailProvider: {
      type: String,
      default: "gmail"
    },

    emailPassword: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt automatically
  }
);

export default mongoose.model("User", userSchema);
