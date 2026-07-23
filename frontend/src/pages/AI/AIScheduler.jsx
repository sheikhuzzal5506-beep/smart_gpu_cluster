import { useEffect, useState } from "react";
import { calculateScores } from "../../services/aiSchedulerService";

import AIScoreCard from "../../components/ui/AIScoreCard";
import AIScoreTable from "../../components/ui/AIScoreTable";

export default function AIScheduler() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadScores() {
    try {
      setLoading(true);
      const data = await calculateScores();
      setNodes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadScores();

    const interval = setInterval(loadScores, 5000);

    return () => clearInterval(interval);
  }, []);

  const bestNode = nodes.length ? nodes[0] : null;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          AI Scheduler
        </h1>

        <p className="text-slate-400 mt-2">
          Intelligent GPU Node Recommendation
        </p>
      </div>

      {bestNode && (
        <div className="grid md:grid-cols-4 gap-6">

          <AIScoreCard
            title="Best Node"
            value={bestNode.node_name}
            color="text-cyan-400"
          />

          <AIScoreCard
            title="AI Score"
            value={bestNode.ai_score}
            color="text-green-400"
          />

          <AIScoreCard
            title="Available GPUs"
            value={`${bestNode.available_gpus}/${bestNode.total_gpus}`}
            color="text-yellow-400"
          />

          <AIScoreCard
            title="Temperature"
            value={`${bestNode.temperature}°C`}
            color="text-red-400"
          />

        </div>
      )}

      <AIScoreTable
        nodes={nodes}
        loading={loading}
      />

    </div>
  );
}