const { default: apiCall } = require("@/lib/api");

export const addMovie = async (data) => {
    const res = await apiCall("/movie/add", "POST", data, { withCredentials: true, contentType: "multipart/form-data" });
    return res;
}

export const getAdminMovies = async (id) => {
    const res = await apiCall("/movie", "GET", null, { withCredentials: true, params: { adminId: id } });
    return res;
}

export const deleteAdminMovie = async (id, adminId) => {
    const res = await apiCall(`/movie/delete`, "DELETE", { adminId: adminId }, { withCredentials: true, params: { id: id } });
    return res;
}