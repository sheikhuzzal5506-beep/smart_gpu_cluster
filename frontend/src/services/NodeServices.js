import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getNodes = async () => {
  try {
    const response = await API.get("/nodes/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch GPU nodes:", error);
    return [];
  }
};

export const createNode = async (node) => {
  const response = await API.post("/nodes/", node);
  return response.data;
};

export const updateNode = async (id, node) => {
  const response = await API.put(`/nodes/${id}`, node);
  return response.data;
};

export const deleteNode = async (id) => {
  await API.delete(`/nodes/${id}`);
};