import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/libs/auth.js";

dotenv.config();

const app = express();

// Auth routes PEHLE — json middleware se pehle
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ContentBuddy API running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});