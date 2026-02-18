const { default: apiCall } = require("@/lib/api");

export const addMovie = async (data) => {
    const res = await apiCall("/movie/add", "POST", data, { withCredentials: true,contentType: "multipart/form-data" });
    return res;
}