import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getNodes = async () => {
  const response = await API.get("/nodes/");
  return response.data;
};

export const calculateScores = async () => {
  const nodes = await getNodes();

  const scoredNodes = nodes.map((node) => {
    let score = 0;

    // GPU Utilization (40%)
    score += (100 - node.utilization_percent) * 0.40;

    // Temperature (25%)
    score += (100 - node.temperature) * 0.25;

    // Available GPUs (20%)
    score +=
      (node.available_gpus / node.total_gpus) * 100 * 0.20;

    // Health Status (15%)
    score +=
      node.health_status === "Healthy"
        ? 15
        : node.health_status === "Warning"
        ? 8
        : 0;

    return {
      ...node,
      ai_score: score.toFixed(2),
    };
  });

  scoredNodes.sort(
    (a, b) => b.ai_score - a.ai_score
  );

  return scoredNodes;
};