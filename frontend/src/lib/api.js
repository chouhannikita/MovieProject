import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function apiCall(endpoint, method = "GET", data = null, options = {}) {
  try {
    const response = await axios({
      url: `${API}${endpoint}`,
      method,
      data,
      headers: {
        "Content-Type": options?.contentType || "application/json",
      },
      withCredentials: options.withCredentials || false,
      params: options.params || {},
    });

    return response;
  } catch (error) {
    return error
  }
}

export default apiCall;
