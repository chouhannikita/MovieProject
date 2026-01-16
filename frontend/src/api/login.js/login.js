const { default: apiCall } = require("@/lib/api");

export const loginAdminApi = async (data) => {
    const res = await apiCall("/admin/login", "POST", data);
    return res;
}
