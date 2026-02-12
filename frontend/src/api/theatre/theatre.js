
const { default: apiCall } = require("@/lib/api");

export const addTheatre = async (data) => {
    const res = await apiCall("/theatre/add", "POST", data, { withCredentials: true, });
    return res;
}

export const getAdminTheatres = async () => {
    const res = await apiCall("/theatre", "GET", null, { withCredentials: true, });
    return res;
}