import cron from "node-cron";
import ScheduledEmail from "../models/ScheduledEmail.js";
import { sendEmail } from "../services/emailService.js";
import User from "../models/User.js";
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
                const user = await User.findById(email.userId);
                if (!user) {
                    throw new Error("User not found");
                }

                await sendEmail({
                to: email.to,
                subject: email.subject,
                body: email.body,
                user: user
                });

                email.status = "sent";
                await email.save();

            } catch (error) {
                email.retryCount += 1;

                if (email.retryCount >= 3) {
                email.status = "failed";
                }

                await email.save();
            }
        }

    } catch (error) {
      console.error("Scheduler error:", error.message);
    }
  });
};

export default startEmailScheduler;
