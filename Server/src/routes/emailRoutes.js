import express from "express";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    await sendEmail({ to, subject, body });
    res.json({ message: "Email sent successfully ✅" });
  } catch (error) {
    console.error("Email sending error:", error.message);
    res.status(500).json({ error: "Email sending failed ❌", details: error.message });
  }
});

export default router;
