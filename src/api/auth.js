
import apiService from "./apiService";

/*
====================================
Auth APIs
====================================
*/

export const uploadProfileImage = async (file) => {
  // Accept FormData directly and do not set Content-Type header manually
  return await apiService.post("/uploads/", file);
};

export const loginUser = (credentials) => {
  return apiService.post("/auth/login", credentials);
};

export const registerUser = (userData) => {
  return apiService.post("/auth/register", userData);
};

export const logoutUser = () => {
  return apiService.post("/auth/logout");
};

export const getCurrentUser = () => {
  return apiService.get("/auth/me");
};