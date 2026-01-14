import FormInput from "@/components/Form-Input/FormInput";
import CustomButton from "@/components/custom-button/CustomButton";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { verifyOtpApi } from "@/api/register/register";
import { useRouter } from "next/navigation";

const RESEND_TIME = 20;

const VerifyOTP = ({ setTab, email }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(RESEND_TIME);
  const router = useRouter();

  useEffect(() => {
    if (timer === 0) {
      setTab(1);
      return;
    } else if (timer === -1) {
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const VerifyOTP = async (e) => {
    e.preventDefault();
    const res = await verifyOtpApi({ otp: otp, email: email });
    if(res.status === 200) {
      router.push('/admin/auth/register/account-setup');
    }else{
      alert("Invalid OTP. Please try again.");
    }
    setTimer(-1);
  };

  return (
    <form onSubmit={VerifyOTP}>
      <FormInput
        label="Otp"
        variant="outlined"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        type="text"
        required={true}
        className="w-full p-3 rounded-lg focus:ring focus:ring-blue-400 outline-none"
      />
      
      {timer > 0 && (
        <span className="flex justify-end">
          Resend OTP in: <b>{timer}s</b>
        </span>
      )}

      <CustomButton
        buttonText={"Verify OTP"}
        type="submit"
        variant="outlined"
        sx={{
          mt: 3,
          height: "48px",
          fontWeight: "bold",
          width: "100%",
          textTransform: "none",
        }}
      />
    </form>
  );
};

VerifyOTP.propTypes = {
  setTab: PropTypes.func.isRequired,
};

export default VerifyOTP;
