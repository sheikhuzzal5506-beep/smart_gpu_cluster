import {
  Cpu,
  Activity,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import StatCard from "../../components/ui/StatCard";
import GPUChart from "../../components/ui/GPUChart";
import ClusterHealth from "../../components/ui/ClusterHealth";
import RecentActivity from "../../components/ui/RecentActivity";

export default function Dashboard() {
  const cards = [
    {
      title: "GPU Usage",
      value: "78%",
      icon: <Cpu size={28} />,
      color: "text-cyan-400",
    },
    {
      title: "Running Jobs",
      value: "12",
      icon: <Activity size={28} />,
      color: "text-green-400",
    },
    {
      title: "Pending Jobs",
      value: "5",
      icon: <Clock3 size={28} />,
      color: "text-yellow-400",
    },
    {
      title: "Completed Jobs",
      value: "84",
      icon: <CheckCircle2 size={28} />,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor and manage your GPU cluster.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <GPUChart />
        </div>

        <ClusterHealth />

      </div>

      <RecentActivity />

    </div>
  );
}