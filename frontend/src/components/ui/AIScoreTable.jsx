export default function AIScoreTable({
  nodes,
  loading,
}) {
  if (loading) {
    return (
      <div className="bg-slate-900 rounded-2xl p-8 text-center text-slate-400">
        Loading AI recommendations...
      </div>
    );
  }

  if (!nodes.length) {
    return (
      <div className="bg-slate-900 rounded-2xl p-8 text-center text-slate-400">
        No GPU nodes found.
      </div>
    );
  }

  const getRecommendation = (score) => {
    const value = Number(score);

    if (value >= 85)
      return {
        text: "Best",
        color: "bg-green-500/20 text-green-400",
      };

    if (value >= 70)
      return {
        text: "Good",
        color: "bg-cyan-500/20 text-cyan-400",
      };

    if (value >= 50)
      return {
        text: "Average",
        color: "bg-yellow-500/20 text-yellow-400",
      };

    return {
      text: "Poor",
      color: "bg-red-500/20 text-red-400",
    };
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">

      <table className="w-full text-left">

        <thead className="bg-slate-900">

          <tr className="text-slate-300">

            <th className="p-4">Rank</th>
            <th className="p-4">Node</th>
            <th className="p-4">AI Score</th>
            <th className="p-4">GPU Usage</th>
            <th className="p-4">Temperature</th>
            <th className="p-4">Available GPUs</th>
            <th className="p-4">Health</th>
            <th className="p-4">Recommendation</th>

          </tr>

        </thead>

        <tbody>

          {nodes.map((node, index) => {
            const recommendation = getRecommendation(
              node.ai_score
            );

            return (
              <tr
                key={node.id}
                className="border-t border-slate-800 hover:bg-slate-900"
              >
                <td className="p-4 font-bold">
                  #{index + 1}
                </td>

                <td className="p-4">
                  {node.node_name}
                </td>

                <td className="p-4 text-cyan-400 font-semibold">
                  {node.ai_score}
                </td>

                <td className="p-4">
                  {node.utilization_percent}%
                </td>

                <td className="p-4">
                  {node.temperature}°C
                </td>

                <td className="p-4">
                  {node.available_gpus} / {node.total_gpus}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      node.health_status === "Healthy"
                        ? "bg-green-500/20 text-green-400"
                        : node.health_status === "Warning"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {node.health_status}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${recommendation.color}`}
                  >
                    {recommendation.text}
                  </span>
                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}
