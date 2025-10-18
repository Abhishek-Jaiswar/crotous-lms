import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000"
      : "https://crotous-lms.vercel.app",
  plugins: [emailOTPClient(), adminClient()],
});
