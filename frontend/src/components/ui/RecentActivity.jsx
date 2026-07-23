const jobs = [
  {
    id: 101,
    user: "Alice",
    gpu: "RTX 4090",
    status: "Running",
  },
  {
    id: 102,
    user: "Bob",
    gpu: "A100",
    status: "Pending",
  },
  {
    id: 103,
    user: "John",
    gpu: "RTX 3090",
    status: "Completed",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

      <h2 className="text-xl font-semibold text-white mb-5">
        Recent Activity
      </h2>

      <table className="w-full text-left text-white">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="py-3">Job</th>
            <th>User</th>
            <th>GPU</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="border-b border-slate-800"
            >
              <td className="py-3">{job.id}</td>
              <td>{job.user}</td>
              <td>{job.gpu}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}