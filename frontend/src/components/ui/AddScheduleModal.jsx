export default function AddScheduleModal({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

      <div className="bg-slate-900 rounded-2xl p-8 w-[500px]">

        <h2 className="text-2xl font-bold text-white mb-6">
          Submit GPU Job
        </h2>

        <p className="text-slate-400 mb-6">
          Scheduler submission form will be added later.
        </p>

        <div className="flex justify-end">

          <button
            onClick={onClose}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl text-white"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}