import API from "./api";

// =========================
// GET ALL JOBS
// =========================
export const getJobs = async () => {
  try {
    const response = await API.get("/jobs/");
    return response.data;
  } catch (error) {
    console.error("Failed to load jobs:", error);
    return [];
  }
};

// =========================
// GET SINGLE JOB
// =========================
export const getJobById = async (id) => {
  const response = await API.get(`/jobs/${id}`);
  return response.data;
};

// =========================
// CREATE JOB
// =========================
export const createJob = async (jobData) => {
  const response = await API.post("/jobs/", jobData);
  return response.data;
};

// =========================
// UPDATE JOB
// =========================
export const updateJob = async (id, jobData) => {
  const response = await API.put(`/jobs/${id}`, jobData);
  return response.data;
};

// =========================
// DELETE JOB
// =========================
export const deleteJob = async (id) => {
  const response = await API.delete(`/jobs/${id}`);
  return response.data;
};

// =========================
// OPTIONAL: CHANGE JOB STATUS
// (Use if your backend supports it. Otherwise leave unused.)
// =========================
export const updateJobStatus = async (id, status) => {
  const response = await API.patch(`/jobs/${id}`, { status });
  return response.data;
};