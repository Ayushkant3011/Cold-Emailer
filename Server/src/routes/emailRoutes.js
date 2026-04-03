import express from "express";
import { sendEmail } from "../services/emailService.js";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/send", protect, async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await sendEmail({ to, subject, body, user });
    res.json({ message: "Email sent successfully ✅" });
  } catch (error) {
    console.error("Email sending error:", error.message);
    res.status(500).json({ error: "Email sending failed ❌", details: error.message });
  }
});

export default router;
