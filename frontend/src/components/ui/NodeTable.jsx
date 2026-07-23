import { Pencil, Trash2 } from "lucide-react";

export default function NodeTable({
  nodes,
  onEdit,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          GPU Nodes
        </h2>

        <input
          type="text"
          placeholder="Search node..."
          className="bg-slate-800 rounded-xl px-4 py-2 text-white border border-slate-700 outline-none"
        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-white">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-4">
                Node Name
              </th>

              <th>
                GPU Model
              </th>

              <th>
                Total GPUs
              </th>

              <th>
                Available
              </th>

              <th>
                Status
              </th>

              <th>
                Health
              </th>

              <th>
                Utilization
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {nodes.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-10 text-slate-400"
                >
                  No GPU Nodes Found
                </td>

              </tr>

            ) : (

              nodes.map((node) => (

                <tr
                  key={node.id}
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >

                  <td className="py-4">

                    {node.node_name}

                  </td>

                  <td className="text-center">

                    {node.gpu_model}

                  </td>

                  <td className="text-center">

                    {node.total_gpus}

                  </td>

                  <td className="text-center">

                    {node.available_gpus}

                  </td>

                  <td className="text-center">

                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">

                      {node.status}

                    </span>

                  </td>

                  <td className="text-center">

                    {node.health_status}

                  </td>

                  <td className="text-center">

                    {node.utilization_percent}%

                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => onEdit(node)}
                        className="text-cyan-400 hover:text-cyan-300"
                      >

                        <Pencil size={18} />

                      </button>

                      <button
                        className="text-red-400 hover:text-red-300"
                      >

                        <Trash2 size={18} />

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