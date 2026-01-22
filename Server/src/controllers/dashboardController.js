import ScheduledEmail from "../models/ScheduledEmail.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await ScheduledEmail.countDocuments({ userId });
    const sent = await ScheduledEmail.countDocuments({ userId, status: "sent" });
    const pending = await ScheduledEmail.countDocuments({ userId, status: "pending" });
    const failed = await ScheduledEmail.countDocuments({ userId, status: "failed" });

    res.json({ total, sent, pending, failed });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};

export const getEmailHistory = async (req, res) => {
  try {
    const emails = await ScheduledEmail.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};
