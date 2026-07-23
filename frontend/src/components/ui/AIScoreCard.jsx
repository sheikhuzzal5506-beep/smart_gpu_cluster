export default function AIScoreCard({
  title,
  value,
  color = "text-cyan-400",
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow hover:border-cyan-500 transition">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

    </div>
  );
}