import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export const register = async (user) => {
  const response = await API.post("/auth/register", user);
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default API;