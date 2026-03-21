type Props = { label: string };

export default function OrDivider({ label }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400 font-medium shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
