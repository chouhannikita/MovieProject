const { default: apiCall } = require("@/lib/api");

export const superAdminRegisterApi = async (data) => {
  const res = await apiCall("/super-admin/login", "POST", data);
  return res;
};

export const sendOtpApi = async (data) => {
  const res = await apiCall("/otp/send", "POST", data);
  return res;
}

export const verifyOtpApi = async (data) => {
  const res = await apiCall("/otp/verify", "POST", data);
  return res;
}
