import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  shield,
  sensitiveInfo,
  slidingWindow,
} from "@arcjet/next";
import { env } from "./env";

export {
  detectBot,
  fixedWindow,
  protectSignup,
  shield,
  sensitiveInfo,
  slidingWindow,
};

export default arcjet({
  key: env.ARCJET_KEY,
  characteristics: ["fingerprint"],

  // Define base rules here, can also be empty if you dont have any base rules
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});
