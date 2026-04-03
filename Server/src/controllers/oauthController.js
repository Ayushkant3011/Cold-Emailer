import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getGoogleAuthUrl = (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/userinfo.email"
    ],
    prompt: "consent" // Force to get refresh token
  });
  
  res.json({ url });
};

export const googleAuthCallback = async (req, res) => {
  const { code } = req.body;
  
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Get user email to link it with the database account
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    // Find the user who has this email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found with this Gmail address. Please register first with this email." });
    }

    // Save refresh token
    if (tokens.refresh_token) {
      user.googleRefreshToken = tokens.refresh_token;
      await user.save();
    }

    res.json({ message: "Gmail connected successfully", success: true });
  } catch (error) {
    console.error("Error exchanging code:", error);
    res.status(500).json({ message: "Failed to connect Gmail" });
  }
};
