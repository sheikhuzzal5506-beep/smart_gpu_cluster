import API from "./api";

export const getDashboardStats = async () => {
  try {
    const [nodesResponse, jobsResponse] = await Promise.all([
      API.get("/nodes/"),
      API.get("/jobs/"),
    ]);

    const gpuNodes = nodesResponse.data;
    const jobList = jobsResponse.data;

    const totalNodes = gpuNodes.length;

    const onlineNodes = gpuNodes.filter(
      (node) => node.status === "Idle" || node.status === "Busy"
    ).length;

    const offlineNodes = gpuNodes.filter(
      (node) => node.status === "Offline"
    ).length;

    const totalGPUs = gpuNodes.reduce(
      (sum, node) => sum + node.total_gpus,
      0
    );

    const availableGPUs = gpuNodes.reduce(
      (sum, node) => sum + node.available_gpus,
      0
    );

    const usedGPUs = totalGPUs - availableGPUs;

    const utilization =
      totalGPUs > 0
        ? Math.round((usedGPUs / totalGPUs) * 100)
        : 0;

    const queuedJobs = jobList.filter(
      (job) => job.status === "Queued"
    ).length;

    const runningJobs = jobList.filter(
      (job) => job.status === "Running"
    ).length;

    const completedJobs = jobList.filter(
      (job) => job.status === "Completed"
    ).length;

    return {
      totalNodes,
      onlineNodes,
      offlineNodes,
      totalGPUs,
      availableGPUs,
      usedGPUs,
      utilization,
      queuedJobs,
      runningJobs,
      completedJobs,
    };
  } catch (error) {
    console.error("Failed to load dashboard data:", error);

    return {
      totalNodes: 0,
      onlineNodes: 0,
      offlineNodes: 0,
      totalGPUs: 0,
      availableGPUs: 0,
      usedGPUs: 0,
      utilization: 0,
      queuedJobs: 0,
      runningJobs: 0,
      completedJobs: 0,
    };
  }
};