import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL || "http://localhost:5001",
  credentials: "include",
  plugins: [adminClient()],
});
