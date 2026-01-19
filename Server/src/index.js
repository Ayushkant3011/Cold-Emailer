import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Registering Routes
import templateRoutes from "./routes/templateRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server running with DB 🚀");
});


app.use("/api/templates", templateRoutes);
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


