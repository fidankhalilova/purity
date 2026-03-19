export default function StickyLayout({
  children,
  sticky,
}: {
  children: React.ReactNode;
  sticky: React.ReactNode;
}) {
  return (
    <div className="pb-16 pt-6 flex gap-16 items-start">
      <div className="flex-1 min-w-0">{children}</div>

      <div className="hidden lg:block w-100 shrink-0 sticky top-25 self-start">
        {sticky}
      </div>
    </div>
  );
}
