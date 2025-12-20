import Otp from "../models/OtpModel.js";
import { generateTempToken } from "../utils/generateJwt.js";
import { sendOtpEmail } from "../utils/sendOtpEmails.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Phone is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await Otp.create({
      email,
      otp,
      expiresAt: Date.now() + 2 * 60 * 1000,
    });

    await sendOtpEmail(email, otp);

    return res.json({ message: "OTP sent", otp });
  } catch (error) {
    console.error("Send OTP Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const found = await Otp.findOne({ phone }).sort({ createdAt: -1 });

    if (!found || found.otp !== otp || found.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const token = generateTempToken(phone, "OTP_VERIFIED");

    res.json({
      message: "OTP verified",
      token,
    });
  } catch (error) {
    console.error("Verify OTP Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
