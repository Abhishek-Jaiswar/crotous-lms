import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { prisma } from "./prisma";
import { env } from "./env";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins:
    process.env.NODE_ENV === "production"
      ? ["https://crotous-lms.vercel.app"]
      : ["http://localhost:3000"],
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
    google: {
      accessType: "offline",
      prompt: "select_account consent",
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        const { data, error } = await resend.emails.send({
          from: "crotous <onboarding@resend.dev>",
          to: [email],
          subject: "crotous - Verify your email",
          html: `<h1>Your otp is: ${otp}<h1/>`,
        });
      },
    }),
  ],
});
