import { useEffect, useMemo, useState } from "react";

import HistoryCard from "../../components/ui/HistoryCard";
import HistoryTable from "../../components/ui/HistoryTable";

import { getHistory } from "../../services/historyService";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  async function loadHistory() {
    try {
      setLoading(true);

      const data = await getHistory();

      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();

    const interval = setInterval(loadHistory, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((job) => {
      const matchSearch =
        job.job_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        job.user_name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All"
          ? true
          : job.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [history, search, statusFilter]);

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Job History
        </h1>

        <p className="text-slate-400 mt-2">
          View previously executed GPU jobs.
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <HistoryCard
          title="Total Jobs"
          value={filteredHistory.length}
          color="text-cyan-400"
        />

        <HistoryCard
          title="Completed"
          value={
            filteredHistory.filter(
              j => j.status === "Completed"
            ).length
          }
          color="text-green-400"
        />

        <HistoryCard
          title="Failed"
          value={
            filteredHistory.filter(
              j => j.status === "Failed"
            ).length
          }
          color="text-red-400"
        />

        <HistoryCard
          title="Cancelled"
          value={
            filteredHistory.filter(
              j => j.status === "Cancelled"
            ).length
          }
          color="text-yellow-400"
        />

      </div>

      <div className="flex gap-4">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search history..."
          className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
        >
          <option>All</option>
          <option>Completed</option>
          <option>Failed</option>
          <option>Cancelled</option>
        </select>

      </div>

      <HistoryTable
        history={filteredHistory}
        loading={loading}
      />

    </div>
  );
}