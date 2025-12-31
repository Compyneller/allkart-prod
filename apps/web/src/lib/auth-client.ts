import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
export const authClient: any = createAuthClient({
  // baseURL: process.env.BASE_URL || "http://localhost:5001",
  baseURL: "http://ec2-65-0-11-78.ap-south-1.compute.amazonaws.com:5001",
  credentials: "include",
  plugins: [adminClient()],
});
