import mongoose from "mongoose";
import dotenv from "dotenv";
import EmailTemplate from "../models/EmailTemplate.js";

dotenv.config();

const templates = [
  {
    role: "Frontend Developer",
    subject: "Application for Frontend Developer Role",
    body: `Hi {{name}},

I hope you are doing well. I am a Frontend Developer with experience in React, JavaScript, and modern UI development.

I would love to apply for the Frontend Developer role at {{company}}.

Looking forward to hearing from you.

Best regards,
{{sender}}`,
    placeholders: ["name", "company", "sender"],
    tone: "formal"
  },
  {
    role: "Backend Developer",
    subject: "Application for Backend Developer Position",
    body: `Hi {{name}},

I am a Backend Developer skilled in Node.js, databases, and API development.

I am very interested in backend opportunities at {{company}}.

Thank you for your time.

Regards,
{{sender}}`,
    placeholders: ["name", "company", "sender"],
    tone: "formal"
  }
];

const seedTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await EmailTemplate.deleteMany();
    await EmailTemplate.insertMany(templates);
    console.log("Email templates seeded ✅");
    process.exit();
  } catch (error) {
    console.error("Seeding failed ❌", error);
    process.exit(1);
  }
};

seedTemplates();
