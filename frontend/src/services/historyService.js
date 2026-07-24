import API from "./api";

// =========================
// GET JOB HISTORY
// =========================
export const getHistory = async () => {
  try {
    const response = await API.get("/history/");
    return response.data;
  } catch (error) {
    console.error("Failed to load history:", error);
    return [];
  }
};

// =========================
// GET HISTORY BY ID
// =========================
export const getHistoryById = async (id) => {
  const response = await API.get(`/history/${id}`);
  return response.data;
};

// =========================
// DELETE HISTORY
// Only use if your backend supports it.
// =========================
export const deleteHistory = async (id) => {
  const response = await API.delete(`/history/${id}`);
  return response.data;
};

// =========================
// CLEAR ALL HISTORY
// Only use if your backend supports it.
// =========================
export const clearHistory = async () => {
  const response = await API.delete("/history/");
  return response.data;
};