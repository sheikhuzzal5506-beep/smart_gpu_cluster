import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getHistory = async () => {
  try {
    const response = await API.get("/history/");
    return response.data;
  } catch (error) {
    console.error("Failed to load history:", error);
    return [];
  }
};

export default API;