import express from "express";
import ScheduledEmail from "../models/ScheduledEmail.js";

const router = express.Router();

router.post("/schedule", async (req, res) => {
  try {
    const {
      to,
      subject,
      body,
      sendAt
    } = req.body;

    const email = await ScheduledEmail.create({
      to,
      subject,
      body,
      sendAt
    });

    res.json({ message: "Email scheduled successfully", email });
  } catch (error) {
    res.status(500).json({ error: "Scheduling failed" });
  }
});

export default router;
