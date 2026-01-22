import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { decrypt } from "../utils/crypto";

dotenv.config();

export const sendEmail = async ({ to, subject, body, user }) => {
  const decryptedPass = decrypt(user.emailPassword);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.email,
      pass: decryptedPass
    }
  });

  await transporter.sendMail({
    to,
    subject,
    text: body,
    from: user.email
  });
};