import { useEffect, useMemo, useState } from "react";

import MonitoringCard from "../../components/ui/MonitoringCard";
import MonitoringTable from "../../components/ui/MonitoringTable";

import { getNodes } from "../../services/gpuNodeService";

export default function Monitoring() {

  const [nodes, setNodes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [healthFilter, setHealthFilter] =
    useState("All");

  async function loadMonitoring() {

    try {

      setLoading(true);

      const data = await getNodes();

      setNodes(data);

    } catch (err) {

      console.error(err);

      alert("Failed to load monitoring.");

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadMonitoring();

    const interval = setInterval(() => {

      loadMonitoring();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const filteredNodes = useMemo(() => {

    return nodes.filter((node) => {

      const matchSearch =
        node.node_name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All"
          ? true
          : node.status === statusFilter;

      const matchHealth =
        healthFilter === "All"
          ? true
          : node.health_status === healthFilter;

      return (
        matchSearch &&
        matchStatus &&
        matchHealth
      );

    });

  }, [
    nodes,
    search,
    statusFilter,
    healthFilter,
  ]);

  const totalNodes = filteredNodes.length;

  const healthyNodes =
    filteredNodes.filter(
      node => node.health_status === "Healthy"
    ).length;

  const busyNodes =
    filteredNodes.filter(
      node => node.status === "Busy"
    ).length;

  const avgUtilization =
    totalNodes === 0
      ? 0
      : Math.round(
          filteredNodes.reduce(
            (sum, node) =>
              sum + (node.utilization_percent ?? 0),
            0
          ) / totalNodes
        );

  if (loading) {

    return (

      <div className="text-white text-xl">

        Loading Monitoring...

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">

          GPU Monitoring

        </h1>

        <p className="text-slate-400 mt-2">

          Real-time monitoring of GPU cluster.

        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <MonitoringCard
          title="Total Nodes"
          value={totalNodes}
          color="text-cyan-400"
        />

        <MonitoringCard
          title="Healthy"
          value={healthyNodes}
          color="text-green-400"
        />

        <MonitoringCard
          title="Busy"
          value={busyNodes}
          color="text-yellow-400"
        />

        <MonitoringCard
          title="Avg Utilization"
          value={`${avgUtilization}%`}
          color="text-blue-400"
        />

      </div>

      <div className="flex gap-4">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search GPU Node..."
          className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
        >
          <option>All</option>
          <option>Idle</option>
          <option>Busy</option>
          <option>Offline</option>
        </select>

        <select
          value={healthFilter}
          onChange={(e) =>
            setHealthFilter(e.target.value)
          }
          className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
        >
          <option>All</option>
          <option>Healthy</option>
          <option>Warning</option>
          <option>Critical</option>
        </select>

      </div>

      <MonitoringTable
        nodes={filteredNodes}
        loading={loading}
      />

    </div>

  );

}