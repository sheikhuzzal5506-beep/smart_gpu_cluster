import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", gpu: 40 },
  { day: "Tue", gpu: 55 },
  { day: "Wed", gpu: 62 },
  { day: "Thu", gpu: 70 },
  { day: "Fri", gpu: 81 },
  { day: "Sat", gpu: 75 },
  { day: "Sun", gpu: 90 },
];

export default function GPUChart() {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 h-96">
      <h2 className="text-xl font-semibold text-white mb-5">
        GPU Utilization
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="gpu"
            stroke="#22d3ee"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}