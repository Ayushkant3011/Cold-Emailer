import express from "express";
import { getGoogleAuthUrl, googleAuthCallback } from "../controllers/oauthController.js";

const router = express.Router();

router.get("/google/url", getGoogleAuthUrl);
router.post("/google/callback", googleAuthCallback);

export default router;
