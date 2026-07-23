export default function QueueTable({
  queue,
  loading,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-slate-900 rounded-2xl p-8 text-center text-white">
        Loading Queue...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Scheduler Queue
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-white">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-4">Job</th>
              <th>User</th>
              <th>GPU</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {queue.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-12 text-slate-400"
                >
                  No Jobs In Queue
                </td>

              </tr>

            ) : (

              queue.map((job) => (

                <tr
                  key={job.id}
                  className="border-b border-slate-800"
                >

                  <td className="py-4">
                    {job.job_name}
                  </td>

                  <td>
                    {job.user_name ?? "-"}
                  </td>

                  <td>
                    {job.gpu_required}
                  </td>

                  <td>
                    {job.priority}
                  </td>

                  <td>
                    {job.status}
                  </td>

                  <td>

                    <button
                      onClick={() => onDelete(job.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                    >
                      Cancel
                    </button>

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