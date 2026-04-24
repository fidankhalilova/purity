type Props = {
  label: string;
  color?: "green" | "red" | "yellow" | "blue" | "gray" | "orange";
};

const colorMap = {
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-500",
  yellow: "bg-yellow-100 text-yellow-700",
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-gray-100 text-gray-600",
  orange: "bg-orange-100 text-orange-700",
};

export default function AdminBadge({ label, color = "gray" }: Props) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${colorMap[color]}`}
    >
      {label}
    </span>
  );
}
