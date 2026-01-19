import express from "express";
import EmailTemplate from "../models/EmailTemplate.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const templates = await EmailTemplate.find();
  res.json(templates);
});

export default router;
