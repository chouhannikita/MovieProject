"use client";
import { superAdminRegisterApi } from "@/api/register/register";
import FormInput from "@/components/Form-Input/FormInput";
import CustomButton from "@/components/custom-button/CustomButton";
import { useSnackbar } from "@/context/SnackbarContext";
import { useState } from "react";
export default function SuperAdminLogin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData, role: "superadmin" };
    const res = await superAdminRegisterApi(payload);
    console.log(res);
    if (res.status === 200) {
      showSnackbar("Login successful!", "success");
    } else {
      showSnackbar(res?.response?.data?.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Super Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Email"
            variant="outlined"
            value={formData?.email}
            onChange={handleChange}
            type="text"
            name="email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-400 outline-none"
          />
          <FormInput
            label="password"
            variant="outlined"
            value={formData?.password}
            onChange={handleChange}
            type="text"
            name="password"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-400 outline-none"
          />

          <CustomButton
            buttonText={"Submit"}
            type="submit"
            customClass="w-full bg-blue-600 hover:bg-blue-700 text-white"
          />
        </form>
      </div>
    </div>
  );
}
