import axios from "axios";
const api = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:5001",
  // baseURL: "https://api.bagalkidukaan.store",

  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If there's a response from the server
    if (error.response?.data) {
      const { message, errors, statusCode } = error.response.data;

      // Create a new error with flattened structure
      const flattenedError = new Error(message);
      Object.assign(flattenedError, {
        message,
        errors,
        statusCode,
        status: statusCode,
      });

      return Promise.reject(flattenedError);
    }

    // Network error or no response
    return Promise.reject(error);
  }
);

export default api;
