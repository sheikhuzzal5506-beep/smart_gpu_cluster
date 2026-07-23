export default function JobQueuePanel({
  stats,
}) {
  const total =
    stats.queuedJobs +
    stats.runningJobs +
    stats.completedJobs;

  const queued =
    total === 0
      ? 0
      : Math.round((stats.queuedJobs / total) * 100);

  const running =
    total === 0
      ? 0
      : Math.round((stats.runningJobs / total) * 100);

  const completed =
    total === 0
      ? 0
      : Math.round((stats.completedJobs / total) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

      <h2 className="text-2xl font-bold text-white mb-8">
        Job Queue Analytics
      </h2>

      <QueueBar
        label="Queued"
        value={stats.queuedJobs}
        percent={queued}
        color="bg-yellow-500"
      />

      <QueueBar
        label="Running"
        value={stats.runningJobs}
        percent={running}
        color="bg-green-500"
      />

      <QueueBar
        label="Completed"
        value={stats.completedJobs}
        percent={completed}
        color="bg-cyan-500"
      />

    </div>
  );
}

function QueueBar({
  label,
  value,
  percent,
  color,
}) {
  return (
    <div className="mb-8">

      <div className="flex justify-between mb-2">

        <span className="text-white">
          {label}
        </span>

        <span className="text-slate-400">
          {value}
        </span>

      </div>

      <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">

        <div
          className={`${color} h-full transition-all duration-700`}
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>
  );
}