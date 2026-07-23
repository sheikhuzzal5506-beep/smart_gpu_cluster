export default function NodeCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

      <p className="text-slate-400">
        {title}
      </p>

      <h2 className={`text-3xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

    </div>
  );
}