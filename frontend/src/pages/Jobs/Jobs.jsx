import { useEffect, useMemo, useState } from "react";

import JobCard from "../../components/ui/JobCard";
import JobTable from "../../components/ui/JobTable";
import AddJobModal from "../../components/ui/AddJobModal";

import {
  getJobs,
  deleteJob,
} from "../../services/jobService";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  async function loadJobs() {
    try {
      setLoading(true);

      const data = await getJobs();

      setJobs(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  async function handleDelete(job) {
    const ok = window.confirm(
      `Delete "${job.job_name}" ?`
    );

    if (!ok) return;

    try {
      await deleteJob(job.id);

      await loadJobs();

      alert("Job deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  }

  function handleEdit(job) {
    setSelectedJob(job);
    setOpen(true);
  }

  function handleAdd() {
    setSelectedJob(null);
    setOpen(true);
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
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
  }, [jobs, search, statusFilter]);

  const totalJobs = jobs.length;

  const queuedJobs = jobs.filter(
    (j) => j.status === "Queued"
  ).length;

  const runningJobs = jobs.filter(
    (j) => j.status === "Running"
  ).length;

  const completedJobs = jobs.filter(
    (j) => j.status === "Completed"
  ).length;

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            AI Jobs
          </h1>

          <p className="text-slate-400 mt-2">
            Submit and manage AI training jobs.
          </p>

        </div>

        <button
          onClick={handleAdd}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl"
        >
          + Submit Job
        </button>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <JobCard
          title="Total Jobs"
          value={totalJobs}
          color="text-cyan-400"
        />

        <JobCard
          title="Queued"
          value={queuedJobs}
          color="text-yellow-400"
        />

        <JobCard
          title="Running"
          value={runningJobs}
          color="text-green-400"
        />

        <JobCard
          title="Completed"
          value={completedJobs}
          color="text-blue-400"
        />

      </div>

      <div className="flex gap-4">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search Job..."
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
          <option>Queued</option>
          <option>Running</option>
          <option>Completed</option>
          <option>Failed</option>
        </select>

      </div>

      <JobTable
        jobs={filteredJobs}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddJobModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          loadJobs();
        }}
        selectedJob={selectedJob}
      />

    </div>
  );
}