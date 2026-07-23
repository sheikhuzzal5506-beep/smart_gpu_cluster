import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMonitoringData = async () => {
  try {
    const response = await API.get("/monitoring/");
    return response.data;
  } catch (error) {
    console.error("Failed to load monitoring data:", error);
    return [];
  }
};

export default API;