import cron from "node-cron";
import ScheduledEmail from "../models/ScheduledEmail.js";
import { sendEmail } from "../services/emailService.js";
import dotenv from "dotenv";

dotenv.config();


const startEmailScheduler = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const emails = await ScheduledEmail.find({
        sendAt: { $lte: now },
        status: "pending"
      });

      for (const email of emails) {
        try {
          await sendEmail({
            to: email.to,
            subject: email.subject,
            body: email.body,
            userEmail: process.env.GMAIL_USER,
            userPass: process.env.GMAIL_PASS
          });

          email.status = "sent";
          await email.save();

          console.log(`Email sent to ${email.to}`);
        } catch (err) {
          email.status = "failed";
          await email.save();
          console.error("Email failed:", err.message);
        }
      }
    } catch (error) {
      console.error("Scheduler error:", error.message);
    }
  });
};

export default startEmailScheduler;
