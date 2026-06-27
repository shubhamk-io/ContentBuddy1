import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

// ✅ authClient se destructure karo — naya instance mat banao
export const { signIn, signUp, signOut, useSession } = authClient;