import API from "./api";

// =========================
// GET JOB QUEUE
// =========================
export const getQueue = async () => {
  try {
    const response = await API.get("/scheduler/queue");
    return response.data;
  } catch (error) {
    console.error("Failed to load queue:", error);
    return [];
  }
};

// =========================
// SUBMIT JOB TO SCHEDULER
// =========================
export const submitJob = async (jobData) => {
  const response = await API.post("/scheduler/submit", jobData);
  return response.data;
};

// =========================
// CANCEL JOB
// =========================
export const cancelJob = async (id) => {
  const response = await API.delete(`/scheduler/${id}`);
  return response.data;
};

// =========================
// OPTIONAL: RUN SCHEDULER
// Only use if your backend has this endpoint.
// =========================
export const runScheduler = async () => {
  const response = await API.post("/scheduler/run");
  return response.data;
};

// =========================
// OPTIONAL: GET SCHEDULER STATUS
// Only use if your backend has this endpoint.
// =========================
export const getSchedulerStatus = async () => {
  const response = await API.get("/scheduler/status");
  return response.data;
};