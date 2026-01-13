import { sendOtpApi } from "@/api/register/register";
import FormInput from "@/components/Form-Input/FormInput";
import CustomButton from "@/components/custom-button/CustomButton";
import { useSnackbar } from "@/context/SnackbarContext";
import React, { useState } from "react";

const SentOTP = ({setTab,email,setEmail}) => {
    const [loader, setLoader] = useState(false);
    const { showSnackbar } = useSnackbar();
  
    const handleChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleOtp = async (e) => {
      e.preventDefault();
      setLoader(true);
      const res = await sendOtpApi({ email: email });
      if (res?.status === 200) {
        showSnackbar("OTP sent successfully", "success");
        setTab(2)
      } else {
        showSnackbar("Failed to send OTP", "error");
      }
      setLoader(false);
    };

  return (
    <form onSubmit={handleOtp}>
      <FormInput
        label="Email"
        placeholder="Enter your mobile no"
        variant="outlined"
        value={email}
        onChange={handleChange}
        type="email"
        required={true}
        className="w-full p-3 rounded-lg focus:ring focus:ring-blue-400 outline-none"
      />

      <CustomButton
        buttonText={"Send OTP"}
        type="submit"
        variant="outlined"
        loader={loader}
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

export default SentOTP;
