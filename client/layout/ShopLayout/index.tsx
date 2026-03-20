export default function ShopLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start pt-6 pb-16">
      <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 lg:self-start">
        {sidebar}
      </div>

      <div className="flex-1 min-w-0 w-full">{children}</div>
    </div>
  );
}
