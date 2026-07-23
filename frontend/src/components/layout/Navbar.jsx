import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Intelligent GPU Cluster Scheduler
        </h2>

        <p className="text-sm text-slate-400">
          Manage GPU resources efficiently
        </p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell
            size={22}
            className="text-slate-300 hover:text-cyan-400 transition"
          />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <UserCircle
            size={34}
            className="text-cyan-400"
          />

          <div>
            <p className="text-white font-semibold">
              Admin
            </p>

            <p className="text-xs text-slate-400">
              Cluster Manager
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
