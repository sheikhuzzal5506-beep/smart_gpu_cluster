import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getQueue = async () => {
  try {
    const response = await API.get("/scheduler/queue");
    return response.data;
  } catch (error) {
    console.error("Failed to load queue:", error);
    return [];
  }
};

export const submitJob = async (data) => {
  const response = await API.post("/scheduler/submit", data);
  return response.data;
};

export const cancelJob = async (id) => {
  const response = await API.delete(`/scheduler/${id}`);
  return response.data;
};

export default API;