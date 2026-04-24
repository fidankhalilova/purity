"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminTabs } from "@/config/adminTabs";
import { Menu, X, LogOut } from "lucide-react";

export default function AdminSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeSection = pathname?.split("/").pop();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-black text-3xl tracking-tight italic">
            PURITY
          </span>
          <span className="text-white/40 text-xs font-medium bg-white/10 px-2 py-0.5 rounded-full">
            Admin
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {(() => {
          const grouped: Record<string, typeof adminTabs> = {};
          const ungrouped: typeof adminTabs = [];

          adminTabs.forEach((tab) => {
            if (tab.group) {
              if (!grouped[tab.group]) grouped[tab.group] = [];
              grouped[tab.group].push(tab);
            } else {
              ungrouped.push(tab);
            }
          });

          return (
            <div className="flex flex-col gap-1">
              {ungrouped
                .filter((t) => t.id === "dashboard")
                .map(({ id, label, icon: Icon, description }) => {
                  const isActive = activeSection === id;
                  return (
                    <Link
                      key={id}
                      href={`/admin/${id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-150 ${isActive ? "bg-white text-[#1f473e]" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${isActive ? "text-[#1f473e]" : "text-white/60 group-hover:text-white"}`}
                      />
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-semibold leading-none ${isActive ? "text-[#1f473e]" : ""}`}
                        >
                          {label}
                        </p>
                        <p
                          className={`text-xs mt-0.5 truncate ${isActive ? "text-[#1f473e]/60" : "text-white/40"}`}
                        >
                          {description}
                        </p>
                      </div>
                    </Link>
                  );
                })}

              {Object.entries(grouped).map(([group, tabs]) => (
                <div key={group} className="mt-3">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-widest px-3 mb-1">
                    {group}
                  </p>
                  {tabs.map(({ id, label, icon: Icon, description }) => {
                    const isActive = activeSection === id;
                    return (
                      <Link
                        key={id}
                        href={`/admin/${id}`}
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-2xl transition-all duration-150 ${isActive ? "bg-white text-[#1f473e]" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${isActive ? "text-[#1f473e]" : "text-white/60 group-hover:text-white"}`}
                        />
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-semibold leading-none ${isActive ? "text-[#1f473e]" : ""}`}
                          >
                            {label}
                          </p>
                          {description && (
                            <p
                              className={`text-xs mt-0.5 truncate ${isActive ? "text-[#1f473e]/60" : "text-white/40"}`}
                            >
                              {description}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}

              {ungrouped
                .filter((t) => t.id === "settings")
                .map(({ id, label, icon: Icon }) => {
                  const isActive = activeSection === id;
                  return (
                    <Link
                      key={id}
                      href={`/admin/${id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-150 mt-3 ${isActive ? "bg-white text-[#1f473e]" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${isActive ? "text-[#1f473e]" : "text-white/60 group-hover:text-white"}`}
                      />
                      <p
                        className={`text-sm font-semibold ${isActive ? "text-[#1f473e]" : ""}`}
                      >
                        {label}
                      </p>
                    </Link>
                  );
                })}
            </div>
          );
        })()}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-white/40 truncate">Administrator</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Store</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 shrink-0 bg-[#1f473e] fixed top-0 left-0 h-screen z-30">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-[#1f473e] flex flex-col">
            <SidebarContent />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-gray-900 capitalize">
                {adminTabs.find((t) => t.id === activeSection)?.label ??
                  "Admin"}
              </h1>
              <p className="text-xs text-gray-400">
                {adminTabs.find((t) => t.id === activeSection)?.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#1f473e] flex items-center justify-center text-white text-sm font-bold">
              AD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
