import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Navbar />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}