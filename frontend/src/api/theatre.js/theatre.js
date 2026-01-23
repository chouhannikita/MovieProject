
const { default: apiCall } = require("@/lib/api");

export const addTheatre = async (data) => {
    const res = await apiCall("/theatre/add", "POST", data, { withCredentials: true, });
    return res;
}