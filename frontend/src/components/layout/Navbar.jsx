import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-8">

      <h2 className="text-xl font-semibold text-white">
        Intelligent GPU Cluster Scheduler
      </h2>

      <div className="flex items-center gap-6">

        <div className="flex items-center bg-slate-800 rounded-lg px-3 py-2">

          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white ml-2"
          />

        </div>

        <Bell className="text-white cursor-pointer" size={22} />

        <UserCircle2 className="text-cyan-400 cursor-pointer" size={34} />

      </div>

    </header>
  );
}