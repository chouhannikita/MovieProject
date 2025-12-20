"use client";

import Image from "next/image";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormInput from "@/components/Form-Input/FormInput";
import { sendOtpApi } from "@/api/register/register";

export default function Signup() {
  const [mobileNo, setMobileNo] = useState("");

  const handleChange = (event) => {
    setMobileNo(event.target.value);
  };

  const handleOtp = () => {
    const res = sendOtpApi({email: mobileNo});
  }
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
      {/* LEFT SECTION */}
      <div className="bg-white px-10 py-16 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900 leading-snug mb-12">
          Benefits of using–Do It Yourself our new event management tool
        </h1>

        {/* Feature 1 */}
        <div className="flex gap-6 mb-10">
          <div className="w-12 h-12">
            <Image
              src="/assets/auth/device.svg"
              alt="Quick registration"
              width={48}
              height={48}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Quick & easy registration</h3>
            <p className="text-gray-600 mt-1">
              Complete your registration with just your PAN card and bank
              details
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex gap-6 mb-10">
          <div className="w-12 h-12">
            <Image
              src="/assets/auth/clock.svg"
              alt="Go live fast"
              width={48}
              height={48}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              Take your events live superfast!
            </h3>
            <p className="text-gray-600 mt-1">
              Publish your event within just 15 minutes! Add event details,
              dates and ticket and BAM! Your event is ready.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex gap-6">
          <div className="w-12 h-12">
            <Image
              src="/assets/auth/analytics.svg"
              alt="Analytics"
              width={48}
              height={48}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              Monitor analytics & insights
            </h3>
            <p className="text-gray-600 mt-1">
              Track event sales, daily ticketing, get daily insights and more in
              real time.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-center px-6">
        <div className="bg-gray-100 w-full max-w-md p-8 rounded-lg">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/assets/logo.svg"
              alt="Do It Yourself"
              width={140}
              height={40}
            />
          </div>

          {/* Mobile Input */}

          <FormInput
            label="Mobile no."
            placeholder="Enter your mobile no"
            variant="outlined"
            value={mobileNo}
            onChange={handleChange}
            type="text"
            name="password"
            className="w-full p-3 rounded-lg focus:ring focus:ring-blue-400 outline-none"
          />

          {/* OTP Button */}
          <Button
            fullWidth
            type="submit"
            onClick={handleOtp}
            // disabled
            sx={{
              mt: 3,
              height: "48px",
            //   backgroundColor: "#d1d5db",
            //   color: "#ffffff",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Send OTP
          </Button>

          <hr className="my-6" />

          {/* Footer */}
          <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <span className="text-red-500 font-medium cursor-pointer">
              Sign in
            </span>
          </p>

          <p className="text-center text-xs text-gray-500 mt-2">
            Incase of any query, please write to <br />
            <span className="text-blue-600">bd@bookmyshow.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
