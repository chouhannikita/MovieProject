const { default: apiCall } = require("@/lib/api");

export const superAdminRegisterApi = async (data) => {
  const res = await apiCall("/super-admin/login", "POST", data);
  return res;
};
