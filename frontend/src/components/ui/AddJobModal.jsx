import { useEffect, useState } from "react";

import {
  createJob,
  updateJob,
} from "../../services/jobService";

export default function AddJobModal({
  isOpen,
  onClose,
  selectedJob,
}) {
  const initialForm = {
    job_name: "",
    user_name: "",
    gpu_required: 1,
    priority: "Medium",
    status: "Queued",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (!isOpen) return;

    if (selectedJob) {
      setFormData({
        job_name: selectedJob.job_name,
        user_name: selectedJob.user_name,
        gpu_required: selectedJob.gpu_required,
        priority: selectedJob.priority,
        status: selectedJob.status,
      });
    } else {
      setFormData(initialForm);
    }
  }, [selectedJob, isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (selectedJob) {
        await updateJob(
          selectedJob.id,
          formData
        );

        alert("Job Updated Successfully!");
      } else {
        await createJob(formData);

        alert("Job Submitted Successfully!");
      }

      onClose();
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(
          JSON.stringify(
            err.response.data,
            null,
            2
          )
        );
      } else {
        alert(err.message);
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 w-[650px] rounded-2xl p-8 border border-slate-700">

        <h2 className="text-3xl font-bold text-white mb-6">

          {selectedJob
            ? "Edit AI Job"
            : "Submit AI Job"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >

          <input
            name="job_name"
            value={formData.job_name}
            onChange={handleChange}
            placeholder="Job Name"
            className="bg-slate-800 rounded-xl p-3 text-white"
            required
          />

          <input
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="User Name"
            className="bg-slate-800 rounded-xl p-3 text-white"
            required
          />

          <input
            type="number"
            name="gpu_required"
            value={formData.gpu_required}
            onChange={handleChange}
            placeholder="GPU Required"
            className="bg-slate-800 rounded-xl p-3 text-white"
            min="1"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="bg-slate-800 rounded-xl p-3 text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-slate-800 rounded-xl p-3 text-white col-span-2"
          >
            <option>Queued</option>
            <option>Running</option>
            <option>Completed</option>
            <option>Failed</option>
          </select>

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
              {selectedJob
                ? "Update Job"
                : "Submit Job"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}