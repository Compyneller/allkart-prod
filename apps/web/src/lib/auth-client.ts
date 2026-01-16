import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
export const authClient: any = createAuthClient({
  baseURL: process.env.BASE_URL || "http://localhost:5001",
  // baseURL: "https://api.bagalkidukaan.store",
  credentials: "include",
  plugins: [adminClient()],
});
