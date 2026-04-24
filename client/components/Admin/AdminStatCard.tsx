type Props = {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
  color?: string;
};

export default function AdminStatCard({
  label,
  value,
  change,
  positive,
  icon,
  color = "bg-[#1f473e]/10",
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div
          className={`w-10 h-10 rounded-2xl ${color} flex items-center justify-center`}
        >
          {icon}
        </div>
        {change && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}
          >
            {positive ? "↑" : "↓"} {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
