import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async ({ to, subject, body, user }) => {
  if (!user.googleRefreshToken) {
    throw new Error("Gmail not connected. Please authorize Gmail in the dashboard.");
  }

  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: user.googleRefreshToken });
  
  // Get an access token
  const { token } = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: user.email,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: user.googleRefreshToken,
      accessToken: token
    }
  });

  await transporter.sendMail({
    to,
    subject,
    text: body,
    from: user.email
  });
};