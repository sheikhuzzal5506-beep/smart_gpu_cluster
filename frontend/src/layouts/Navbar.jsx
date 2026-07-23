export default function Navbar() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-white">
        Intelligent GPU Cluster Scheduler
      </h2>

      <div className="text-sm text-slate-300">
        Admin
      </div>
    </header>
  );
}