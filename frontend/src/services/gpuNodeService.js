import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// =========================
// GET ALL NODES
// =========================
export const getNodes = async () => {
  const response = await API.get("/nodes/");
  return response.data;
};

// =========================
// CREATE NODE
// =========================
export const createNode = async (nodeData) => {
  const response = await API.post("/nodes/", nodeData);
  return response.data;
};

// =========================
// UPDATE NODE
// =========================
export const updateNode = async (id, nodeData) => {
  const response = await API.put(`/nodes/${id}`, nodeData);
  return response.data;
};

// =========================
// DELETE NODE
// =========================
export const deleteNode = async (id) => {
  const response = await API.delete(`/nodes/${id}`);
  return response.data;
};

export default API;