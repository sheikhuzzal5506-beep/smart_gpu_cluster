import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Server,
  BriefcaseBusiness,
  Activity,
  History,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "GPU Nodes",
    path: "/gpu-nodes",
    icon: <Server size={20} />,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: <BriefcaseBusiness size={20} />,
  },
  {
    name: "Monitoring",
    path: "/monitoring",
    icon: <Activity size={20} />,
  },
  {
    name: "History",
    path: "/history",
    icon: <History size={20} />,
  },
  {
    name: "Scheduler",
    path: "/scheduler",
    icon: <Settings size={20} />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#0F172A] text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-cyan-400">
          GPU Scheduler
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Intelligent Cluster Manager
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}

            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      <div className="p-5 border-t border-slate-700">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="text-sm font-semibold">
            Cluster Status
          </p>

          <p className="text-green-400 text-xs mt-2">
            ● Online
          </p>

        </div>

      </div>

    </aside>
  );
}