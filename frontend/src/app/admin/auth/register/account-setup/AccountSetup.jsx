"use client";
import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import GeneralInfo from "./GeneralInfo";
import { registerAdminApi } from "@/api/register/register";
import { useSnackbar } from "@/context/SnackbarContext";
import PropTypes from "prop-types";

const steps = ["General Information", "Upload documents", "Sign agreement"];

const AccountSetup = () => {
  const [accountInfo, setAccountInfo] = useState({ generalInfo: {} });
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const organisationDetails = {
      name: accountInfo.generalInfo.org_name,
      panCard: accountInfo.generalInfo.pan_card,
      address: accountInfo.generalInfo.org_address,
    };

    const contactPerson = {
      name: accountInfo.generalInfo.contact_name,
      email: accountInfo.generalInfo.contact_email,
      mobile: accountInfo.generalInfo.contact_mobile,
    };

    const bankDetails = {
      bankName: accountInfo.generalInfo.bank_name,
      accountNumber: accountInfo.generalInfo.account_number,
      ifscCode: accountInfo.generalInfo.ifsc_code,
    };

    const finalAccountInfo = {
      organisation: organisationDetails,
      contactPerson: contactPerson,
      bankDetails: bankDetails,
      role: "ADMIN",
      password: accountInfo.generalInfo.password,
      email: accountInfo.generalInfo.contact_email,
      mobile: accountInfo.generalInfo.contact_mobile,
      status: "PENDING",
    };

    const res = await registerAdminApi(finalAccountInfo);
    if (res.status === 201) {
      showSnackbar(
        "Account registered successfully! Awaiting approval.",
        "success"
      );
    } else {
      showSnackbar(
        res?.response?.data?.message || "Registration failed",
        "error"
      );
    }
  };
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
        <form onSubmit={handleSubmit}>
          <GeneralInfo
            Section={Section}
            accountInfo={accountInfo}
            setAccountInfo={setAccountInfo}
          />
        </form>
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

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
