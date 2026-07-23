import { useEffect, useState } from "react";
import {
  createNode,
  updateNode,
} from "../../services/gpuNodeService";

export default function AddNodeModal({
  isOpen,
  onClose,
  selectedNode,
}) {
  const initialForm = {
    node_name: "",
    ip_address: "",
    cpu_cores: 16,
    ram_gb: 64,
    gpu_model: "",
    gpu_memory_gb: 24,
    total_gpus: 1,
    available_gpus: 1,
    status: "Idle",
    health_status: "Healthy",
    utilization_percent: 0,
    temperature: 35,
    power_usage: 120,
    scheduler_index: 1,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (!isOpen) return;

    if (selectedNode) {
      setFormData({
        node_name: selectedNode.node_name,
        ip_address: selectedNode.ip_address,
        cpu_cores: selectedNode.cpu_cores,
        ram_gb: selectedNode.ram_gb,
        gpu_model: selectedNode.gpu_model,
        gpu_memory_gb: selectedNode.gpu_memory_gb,
        total_gpus: selectedNode.total_gpus,
        available_gpus: selectedNode.available_gpus,
        status: selectedNode.status,
        health_status: selectedNode.health_status,
        utilization_percent: selectedNode.utilization_percent,
        temperature: selectedNode.temperature,
        power_usage: selectedNode.power_usage,
        scheduler_index: selectedNode.scheduler_index,
      });
    } else {
      setFormData(initialForm);
    }
  }, [selectedNode, isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === ""
            ? 0
            : Number(value)
          : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (selectedNode) {
        await updateNode(selectedNode.id, formData);

        alert("GPU Node Updated Successfully!");
      } else {
        await createNode(formData);

        alert("GPU Node Added Successfully!");
      }

      onClose();
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(JSON.stringify(err.response.data, null, 2));
      } else {
        alert(err.message);
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 w-[720px] rounded-2xl p-8 border border-slate-700 max-h-[90vh] overflow-y-auto">

        <h2 className="text-3xl font-bold text-white mb-6">

          {selectedNode ? "Edit GPU Node" : "Add GPU Node"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >

          <input
            name="node_name"
            value={formData.node_name}
            onChange={handleChange}
            placeholder="Node Name"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            name="ip_address"
            value={formData.ip_address}
            onChange={handleChange}
            placeholder="IP Address"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            type="number"
            name="cpu_cores"
            value={formData.cpu_cores}
            onChange={handleChange}
            placeholder="CPU Cores"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            type="number"
            name="ram_gb"
            value={formData.ram_gb}
            onChange={handleChange}
            placeholder="RAM (GB)"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            name="gpu_model"
            value={formData.gpu_model}
            onChange={handleChange}
            placeholder="GPU Model"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            type="number"
            name="gpu_memory_gb"
            value={formData.gpu_memory_gb}
            onChange={handleChange}
            placeholder="GPU Memory (GB)"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            type="number"
            name="total_gpus"
            value={formData.total_gpus}
            onChange={handleChange}
            placeholder="Total GPUs"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            type="number"
            name="available_gpus"
            value={formData.available_gpus}
            onChange={handleChange}
            placeholder="Available GPUs"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />
                    <input
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Status"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            name="health_status"
            value={formData.health_status}
            onChange={handleChange}
            placeholder="Health Status"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            type="number"
            name="utilization_percent"
            value={formData.utilization_percent}
            onChange={handleChange}
            placeholder="Utilization (%)"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="Temperature (°C)"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            type="number"
            name="power_usage"
            value={formData.power_usage}
            onChange={handleChange}
            placeholder="Power Usage (W)"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <input
            type="number"
            name="scheduler_index"
            value={formData.scheduler_index}
            onChange={handleChange}
            placeholder="Scheduler Index"
            className="bg-slate-800 rounded-xl p-3 text-white"
          />

          <div className="col-span-2 flex justify-end gap-4 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
            >
              {selectedNode ? "Update Node" : "Save Node"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}