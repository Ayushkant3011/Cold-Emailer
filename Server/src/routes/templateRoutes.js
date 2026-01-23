import express from "express";
import EmailTemplate from "../models/EmailTemplate.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all templates
router.get("/", async (req, res) => {
  const templates = await EmailTemplate.find();
  res.json(templates);
});

// Create template
router.post("/", protect, async (req, res) => {
  const { role, subject, body } = req.body;

  const template = await EmailTemplate.create({
    role,
    subject,
    body,
    placeholders: ["name", "company", "sender"]
  });

  res.json(template);
});

export default router;
