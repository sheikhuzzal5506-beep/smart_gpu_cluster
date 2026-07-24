import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-white">
        Intelligent GPU Cluster Scheduler
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-slate-300">
          Admin
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}