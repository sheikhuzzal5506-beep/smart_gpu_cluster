import {
  LayoutDashboard,
  Server,
  BriefcaseBusiness,
  Activity,
  History,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "GPU Nodes",
    path: "/gpu-nodes",
    icon: Server,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Monitoring",
    path: "/monitoring",
    icon: Activity,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
  {
    name: "Scheduler",
    path: "/scheduler",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-cyan-400">
          GPU Scheduler
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Cluster Management
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-cyan-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}