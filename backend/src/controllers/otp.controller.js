import { generateOtp, verifyOtp } from "../services/otp.service.js";
import { sendOtpEmail } from "../services/email.service.js";

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = await generateOtp(email);
  await sendOtpEmail(email, otp);
  res.json({ message: "OTP sent" });
};

export const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;
  const valid = await verifyOtp(email, otp);
  if (!valid) return res.status(400).json({ message: "Invalid OTP" });
  res.json({ message: "OTP verified" });
};