"use client";
import React, { useState } from "react";
import { Button, Typography, CircularProgress, Paper } from "@mui/material";
import FormInput from "@/components/Form-Input/FormInput";
import { loginAdminApi } from "@/api/login.js/login";
import { useSnackbar } from "@/context/SnackbarContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showSnackbar } = useSnackbar();

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await loginAdminApi(form);
    if (response.status === 200) {
      showSnackbar("Login successful", "success");
    } else {
      showSnackbar(
        response?.response?.data?.message || "Login failed",
        "error"
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Paper elevation={3} className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <Typography variant="h5" fontWeight={600}>
            BookMyShow Admin
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to manage theatres & shows
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required={true}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required={true}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ height: 44 }}
          >
            {loading ? <CircularProgress size={22} /> : "Login"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <Typography variant="caption" color="text.secondary">
            © BookMyShow Admin Portal
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
