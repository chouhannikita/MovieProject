import jwt from "jsonwebtoken";

export const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
};

export const generateTempToken = (phone) => {
    return generateToken(
      {
        phone,
        type: "TEMP_TOKEN",
        stage: "OTP_VERIFIED"
      },
      "30m"
    );
  };
