import API from "./api";

// =========================
// GET MONITORING DATA
// =========================
export const getMonitoringData = async () => {
  try {
    const response = await API.get("/monitoring/");
    return response.data;
  } catch (error) {
    console.error("Failed to load monitoring data:", error);
    return [];
  }
};

// =========================
// OPTIONAL: REFRESH MONITORING
// =========================
export const refreshMonitoring = async () => {
  const response = await API.get("/monitoring/");
  return response.data;
};