export default function ClusterOverview({
  stats,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

      <h2 className="text-2xl font-bold text-white mb-8">
        Cluster Overview
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <OverviewCard
          title="GPU Utilization"
          value={`${stats.utilization}%`}
          color="text-cyan-400"
        />

        <OverviewCard
          title="Used GPUs"
          value={stats.usedGPUs}
          color="text-red-400"
        />

        <OverviewCard
          title="Available GPUs"
          value={stats.availableGPUs}
          color="text-green-400"
        />

        <OverviewCard
          title="Total GPUs"
          value={stats.totalGPUs}
          color="text-yellow-400"
        />

      </div>

      <div className="mt-10">

        <div className="flex justify-between mb-3">

          <span className="text-slate-400">
            Cluster Utilization
          </span>

          <span className="text-white font-semibold">
            {stats.utilization}%
          </span>

        </div>

        <div className="w-full h-5 rounded-full bg-slate-700 overflow-hidden">

          <div
            className={`h-full transition-all duration-700 ${
              stats.utilization > 90
                ? "bg-red-500"
                : stats.utilization > 70
                ? "bg-yellow-500"
                : "bg-cyan-500"
            }`}
            style={{
              width: `${stats.utilization}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}

function OverviewCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">

      <p className="text-slate-400">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

    </div>
  );
}