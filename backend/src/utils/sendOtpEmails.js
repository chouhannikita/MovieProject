import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"BookMyShow Clone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family:Arial">
        <h2>Your OTP</h2>
        <p>Use this OTP to continue:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 2 minutes.</p>
      </div>
    `,
  });
};
