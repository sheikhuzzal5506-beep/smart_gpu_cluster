export default function SystemHealthPanel({
  stats,
}) {
  const health =
    stats.offlineNodes === 0
      ? "Healthy"
      : stats.offlineNodes <= 2
      ? "Warning"
      : "Critical";

  const healthColor =
    health === "Healthy"
      ? "text-green-400"
      : health === "Warning"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold text-white">
          Cluster Health
        </h2>

        <span className={`text-xl font-bold ${healthColor}`}>
          {health}
        </span>

      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">

        <HealthCard
          title="Online Nodes"
          value={stats.onlineNodes}
          color="text-green-400"
        />

        <HealthCard
          title="Offline Nodes"
          value={stats.offlineNodes}
          color="text-red-400"
        />

        <HealthCard
          title="Running Jobs"
          value={stats.runningJobs}
          color="text-cyan-400"
        />

        <HealthCard
          title="Queued Jobs"
          value={stats.queuedJobs}
          color="text-yellow-400"
        />

      </div>

      <div className="mt-8 border-t border-slate-800 pt-6">

        <div className="flex justify-between mb-4">

          <span className="text-slate-400">
            Cluster Availability
          </span>

          <span className="text-white font-semibold">
            {stats.totalNodes === 0
              ? 0
              : Math.round(
                  (stats.onlineNodes /
                    stats.totalNodes) *
                    100
                )}
            %
          </span>

        </div>

        <div className="w-full h-4 rounded-full bg-slate-700 overflow-hidden">

          <div
            className="bg-green-500 h-full transition-all duration-700"
            style={{
              width: `${
                stats.totalNodes === 0
                  ? 0
                  : Math.round(
                      (stats.onlineNodes /
                        stats.totalNodes) *
                        100
                    )
              }%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}

function HealthCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-5">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>

    </div>
  );
}