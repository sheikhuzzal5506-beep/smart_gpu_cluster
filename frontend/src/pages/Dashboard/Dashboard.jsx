import { useEffect, useState } from "react";

import {
  getDashboardStats,
} from "../../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState({
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
  });

  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);

      const data = await getDashboardStats();

      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(() => {
      loadDashboard();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white text-2xl mt-20">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Intelligent GPU Cluster Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Real-time monitoring of GPU cluster resources.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        <Card
          title="GPU Nodes"
          value={stats.totalNodes}
          color="text-cyan-400"
        />

        <Card
          title="Online"
          value={stats.onlineNodes}
          color="text-green-400"
        />

        <Card
          title="Offline"
          value={stats.offlineNodes}
          color="text-red-400"
        />

        <Card
          title="Total GPUs"
          value={stats.totalGPUs}
          color="text-yellow-400"
        />

        <Card
          title="Available GPUs"
          value={stats.availableGPUs}
          color="text-blue-400"
        />

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">

          <h2 className="text-white text-2xl font-bold mb-6">
            GPU Utilization
          </h2>

          <div className="w-full bg-slate-700 rounded-full h-6">

            <div
              className="bg-cyan-500 h-6 rounded-full transition-all duration-700"
              style={{
                width: `${stats.utilization}%`,
              }}
            />

          </div>

          <p className="text-white text-3xl font-bold mt-6">

            {stats.utilization}%

          </p>

        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">

          <h2 className="text-white text-2xl font-bold mb-6">

            GPU Resources

          </h2>

          <div className="space-y-4">

            <Info
              label="Used GPUs"
              value={stats.usedGPUs}
            />

            <Info
              label="Available GPUs"
              value={stats.availableGPUs}
            />

            <Info
              label="Total GPUs"
              value={stats.totalGPUs}
            />

          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <Card
          title="Queued Jobs"
          value={stats.queuedJobs}
          color="text-yellow-400"
        />

        <Card
          title="Running Jobs"
          value={stats.runningJobs}
          color="text-green-400"
        />

        <Card
          title="Completed Jobs"
          value={stats.completedJobs}
          color="text-cyan-400"
        />

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <p className="text-slate-400">

        {title}

      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>

        {value}

      </h2>

    </div>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div className="flex justify-between text-lg">

      <span className="text-slate-400">

        {label}

      </span>

      <span className="text-white font-semibold">

        {value}

      </span>

    </div>
  );
}