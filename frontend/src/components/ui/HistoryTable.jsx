export default function HistoryTable({
  history,
  loading,
}) {
  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <p className="text-center text-white text-xl">
          Loading History...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        GPU Job History
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-white">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-4">Job Name</th>
              <th>User</th>
              <th>Node</th>
              <th>GPU</th>
              <th>Status</th>
              <th>Runtime</th>
              <th>Submitted</th>
              <th>Completed</th>

            </tr>

          </thead>

          <tbody>

            {history.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-12 text-slate-400"
                >
                  No Job History Found
                </td>

              </tr>

            ) : (

              history.map((job) => (

                <tr
                  key={job.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="py-4">
                    {job.job_name ?? "-"}
                  </td>

                  <td>
                    {job.user_name ?? "-"}
                  </td>

                  <td>
                    {job.node_name ?? "-"}
                  </td>

                  <td>
                    {job.gpu_model ?? "-"}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : job.status === "Failed"
                          ? "bg-red-500/20 text-red-400"
                          : job.status === "Cancelled"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {job.status ?? "Unknown"}
                    </span>

                  </td>

                  <td>
                    {job.runtime ?? "-"}
                  </td>

                  <td>
                    {job.submitted_at ?? "-"}
                  </td>

                  <td>
                    {job.completed_at ?? "-"}
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