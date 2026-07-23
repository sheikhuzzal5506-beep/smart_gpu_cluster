import { useEffect, useMemo, useState } from "react";

import QueueCard from "../../components/ui/QueueCard";
import QueueTable from "../../components/ui/QueueTable";
import AddScheduleModal from "../../components/ui/AddScheduleModal";

import {
  getQueue,
  cancelJob,
} from "../../services/schedulerService";

export default function Scheduler() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");

  const [showModal, setShowModal] = useState(false);

  async function loadQueue() {
    try {
      setLoading(true);
      const data = await getQueue();
      setQueue(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQueue();

    const interval = setInterval(loadQueue, 5000);

    return () => clearInterval(interval);
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Cancel this job?")) return;

    await cancelJob(id);

    loadQueue();
  }

  const filteredQueue = useMemo(() => {
    return queue.filter((job) => {
      const matchSearch =
        job.job_name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchPriority =
        priority === "All"
          ? true
          : job.priority === priority;

      return matchSearch && matchPriority;
    });
  }, [queue, search, priority]);

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Scheduler
          </h1>

          <p className="text-slate-400 mt-2">
            GPU Queue Management
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl text-white"
        >
          Submit Job
        </button>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <QueueCard
          title="Queued Jobs"
          value={filteredQueue.length}
          color="text-cyan-400"
        />

        <QueueCard
          title="High Priority"
          value={
            filteredQueue.filter(
              j => j.priority === "High"
            ).length
          }
          color="text-red-400"
        />

        <QueueCard
          title="Medium Priority"
          value={
            filteredQueue.filter(
              j => j.priority === "Medium"
            ).length
          }
          color="text-yellow-400"
        />

        <QueueCard
          title="Low Priority"
          value={
            filteredQueue.filter(
              j => j.priority === "Low"
            ).length
          }
          color="text-green-400"
        />

      </div>

      <div className="flex gap-4">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Job..."
          className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white flex-1"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

      </div>

      <QueueTable
        queue={filteredQueue}
        loading={loading}
        onDelete={handleDelete}
      />

      <AddScheduleModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={loadQueue}
      />

    </div>
  );
}