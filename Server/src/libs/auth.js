import 'dotenv/config';

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";
import dotenv from "dotenv";

export const auth = betterAuth({
  // ✅ FIX 1: baseURL add karo — Google OAuth redirect ke liye zaroori hai
  baseURL: process.env.SERVER_URL || "http://localhost:3000",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // ✅ FIX 2: trustedOrigins add karo — CORS issue fix hoga
  trustedOrigins: [
    process.env.CLIENT_URL || "http://localhost:5173",
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});