"use client";
import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import GeneralInfo from "./GeneralInfo";

const steps = ["General Information", "Upload documents", "Sign agreement"];

const AccountSetup = () => {
  const [accountInfo, setAccountInfo] = useState({ generalInfo: {} });
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-3xl bg-white rounded-md shadow-md p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2">
          Account Setup
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Please fill in the below details so that we can setup an account for
          your organisation in our system
        </p>

        <Stepper activeStep={0} alternativeLabel className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <GeneralInfo
          Section={Section}
          accountInfo={accountInfo}
          setAccountInfo={setAccountInfo}
        />
      </div>
    </div>
  );
};

export default AccountSetup;

/* ---------- Reusable Section Component ---------- */
const Section = ({ title, children }) => (
  <div className="mb-8">
    <div className="bg-indigo-50 px-4 py-2 rounded text-indigo-700 font-medium mb-4">
      {title}
    </div>
    {children}
  </div>
);
