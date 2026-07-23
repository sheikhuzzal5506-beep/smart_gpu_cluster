export default function ClusterHealth() {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

      <h2 className="text-xl font-semibold text-white">
        Cluster Health
      </h2>

      <div className="space-y-4 mt-6">

        <div className="flex justify-between text-white">
          <span>Healthy Nodes</span>
          <span className="text-green-400">12</span>
        </div>

        <div className="flex justify-between text-white">
          <span>Busy Nodes</span>
          <span className="text-yellow-400">4</span>
        </div>

        <div className="flex justify-between text-white">
          <span>Offline Nodes</span>
          <span className="text-red-400">1</span>
        </div>

      </div>

    </div>
  );
}