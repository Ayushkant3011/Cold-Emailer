import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import startEmailScheduler from "./cron/emailScheduler.js";

// Registering Routes
import templateRoutes from "./routes/templateRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server running with DB 🚀");
});

startEmailScheduler();

// Using Routes 
app.use("/api/templates", templateRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/schedule", scheduleRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


