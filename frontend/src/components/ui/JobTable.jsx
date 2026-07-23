export default function JobTable({
  jobs,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <p className="text-center text-slate-400">
          Loading Jobs...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        AI Jobs
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-white">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-4">ID</th>

              <th className="text-left">Job Name</th>

              <th className="text-left">User</th>

              <th className="text-left">GPU</th>

              <th className="text-left">Priority</th>

              <th className="text-left">Status</th>

              <th className="text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {jobs.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-12 text-slate-400"
                >
                  No Jobs Found
                </td>

              </tr>

            ) : (

              jobs.map((job) => (

                <tr
                  key={job.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >

                  <td className="py-4">
                    {job.id}
                  </td>

                  <td>
                    {job.job_name}
                  </td>

                  <td>
                    {job.user_name}
                  </td>

                  <td>
                    {job.gpu_required}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        job.priority === "High"
                          ? "bg-red-500/20 text-red-400"
                          : job.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {job.priority}
                    </span>

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        job.status === "Running"
                          ? "bg-green-500/20 text-green-400"
                          : job.status === "Queued"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : job.status === "Completed"
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {job.status}
                    </span>

                  </td>

                  <td>

                    <div className="flex gap-2">

                      <button
                        onClick={() => onEdit(job)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(job)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}