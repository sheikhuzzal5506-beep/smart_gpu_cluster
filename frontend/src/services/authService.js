import API from "./api";

// ===============================
// Authentication
// ===============================

// Login
export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);

  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token);
  }

  return response.data;
};

// Register
export const register = async (user) => {
  const response = await API.post("/auth/register", user);
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Check if logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Get JWT token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get Authorization header
export const getAuthHeader = () => {
  const token = getToken();

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};