import Otp from "../models/Otp.model.js";

export const generateOtp = async (identifier) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  await Otp.create({ identifier, otp, expiresAt: Date.now() + 120000 });
  return otp;
};

export const verifyOtp = async (identifier, otp) => {
  const record = await Otp.findOne({ identifier }).sort({ createdAt: -1 });
  if (!record || record.otp !== Number(otp) || record.expiresAt < Date.now()) return false;
  await Otp.deleteMany({ identifier });
  return true;
};