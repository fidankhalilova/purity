export default function StickyLayout({
  children,
  sticky,
}: {
  children: React.ReactNode;
  sticky: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start pt-6 pb-16">
      <div className="flex-1 min-w-0 w-full">{children}</div>

      <div className="hidden lg:block w-96 shrink-0 sticky top-24 self-start">
        {sticky}
      </div>

      <div className="lg:hidden w-full">{sticky}</div>
    </div>
  );
}
