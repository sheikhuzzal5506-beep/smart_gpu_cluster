export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">{title}</p>

          <h2 className="text-3xl font-bold text-white mt-3">
            {value}
          </h2>
        </div>

        <div className={color}>
          {icon}
        </div>
      </div>
    </div>
  );
}