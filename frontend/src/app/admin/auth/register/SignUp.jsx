"use client";

import Image from "next/image";
import LeftLayout from "./LeftLayout";
import SentOTP from "./SentOTP";

export default function Signup() {

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
      <LeftLayout />

      <div className="flex items-center justify-center px-6">
        <div className="bg-gray-100 w-full max-w-md p-8 rounded-lg">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/assets/logo.svg"
              alt="Do It Yourself"
              width={140}
              height={40}
            />
          </div>
          <SentOTP />
          <hr className="my-6" />
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
