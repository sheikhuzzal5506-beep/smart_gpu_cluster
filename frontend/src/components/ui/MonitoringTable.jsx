export default function MonitoringTable({
  nodes,
  loading,
}) {
  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <p className="text-center text-xl text-white">
          Loading Monitoring Data...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        GPU Cluster Monitoring
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-white">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-4">Node</th>
              <th>GPU Model</th>
              <th>GPU Usage</th>
              <th>Temperature</th>
              <th>Power</th>
              <th>Available GPUs</th>
              <th>Health</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {nodes.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-12 text-slate-400"
                >
                  No GPU Nodes Found
                </td>

              </tr>

            ) : (

              nodes.map((node) => {

                const utilization =
                  node.utilization_percent ??
                  node.utilization ??
                  0;

                return (

                  <tr
                    key={node.id}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                  >

                    <td className="py-4">
                      {node.node_name ?? "-"}
                    </td>

                    <td>
                      {node.gpu_model ?? "-"}
                    </td>

                    <td>

                      <div className="flex items-center gap-3">

                        <div className="w-32 h-3 bg-slate-700 rounded-full overflow-hidden">

                          <div
                            className={`h-full transition-all duration-500 ${
                              utilization > 90
                                ? "bg-red-500"
                                : utilization > 70
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${utilization}%`,
                            }}
                          />

                        </div>

                        <span>{utilization}%</span>

                      </div>

                    </td>

                    <td>

                      <span
                        className={
                          (node.temperature ?? 0) > 80
                            ? "text-red-400"
                            : (node.temperature ?? 0) > 60
                            ? "text-yellow-400"
                            : "text-green-400"
                        }
                      >
                        {node.temperature ?? "-"}°C
                      </span>

                    </td>

                    <td>
                      {node.power_usage ?? "-"} W
                    </td>

                    <td>
                      {(node.available_gpus ?? "-")} / {(node.total_gpus ?? "-")}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          node.health_status === "Healthy"
                            ? "bg-green-500/20 text-green-400"
                            : node.health_status === "Warning"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : node.health_status === "Critical"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {node.health_status ?? "Unknown"}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          node.status === "Idle"
                            ? "bg-blue-500/20 text-blue-400"
                            : node.status === "Busy"
                            ? "bg-green-500/20 text-green-400"
                            : node.status === "Offline"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {node.status ?? "Unknown"}
                      </span>

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}