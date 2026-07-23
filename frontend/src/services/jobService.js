import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getJobs = async () => {
  try {
    const response = await API.get("/jobs/");
    return response.data;
  } catch (error) {
    console.error("Failed to load jobs:", error);
    return [];
  }
};

export const getJob = async (id) => {
  const response = await API.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (data) => {
  const response = await API.post("/jobs/", data);
  return response.data;
};

export const updateJob = async (id, data) => {
  const response = await API.put(`/jobs/${id}`, data);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await API.delete(`/jobs/${id}`);
  return response.data;
};

export default API;