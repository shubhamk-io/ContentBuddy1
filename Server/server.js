import 'dotenv/config';

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/libs/auth.js";

dotenv.config();

console.log("Google ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Loaded" : "❌ Missing");
console.log("Google Secret:", process.env.GOOGLE_CLIENT_SECRET ? "✅ Loaded" : "❌ Missing");

const app = express();

// ✅ FIX 3: CORS pehle lagao — auth routes se upar
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Auth routes
app.all("/api/auth/*", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.json({ message: "ContentBuddy API running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});