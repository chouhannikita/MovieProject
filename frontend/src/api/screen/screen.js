
const { default: apiCall } = require("@/lib/api");

export const addScreen = async (data) => {
    const res = await apiCall("/screen/add", "POST", data, { withCredentials: true, });
    return res;
}

export const getAdminScreen = async (id) => {
    const res = await apiCall("/screen", "GET", null, { withCredentials: true,params : {adminId : id} });
    return res;
}