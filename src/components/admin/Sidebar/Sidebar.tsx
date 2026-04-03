"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Library,
  CreditCard,
  BadgePlus,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Users", href: "/users", icon: Users },
  // { label: "Library", href: "/content", icon: Library },
  { label: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { label: "Plans", href: "/plans", icon: BadgePlus },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border text-foreground"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-sidebar-bg border-r border-sidebar-border transition-all duration-200
          ${collapsed ? "w-[92px]" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 pl-3 pr-2 border-b border-sidebar-border">
          <div className="flex items-center  min-w-0 lg:mr-1 gap-2">
            <Image
              src={
                collapsed
                  ? "/Adstacker_logo__1_-removebg-preview (1).png" 
                  : "/Adstacker_logo__1_-removebg-preview (1).png" 
              }
              alt="Adstacker"
              width={collapsed ? 50 : 50}
              sizes={collapsed ? "20px" : "50px"}
              height={collapsed ? 20 : 50}
              className="shrink-0 object-contain dark:brightness-110 transition-all ml-1.5"
              priority
            />
            {!collapsed && (
              <span className="text-lg font-bold text-foreground">
                Ad<span className="text-[#32d2a6]">stacker</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-muted text-muted-foreground"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <button
              onClick={() => {
                setCollapsed(!collapsed);
                setMobileOpen(false);
              }}
              className="hidden lg:flex p-1 gap-2 rounded-md hover:bg-muted text-muted-foreground"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft
                size={20}
                className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={20} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title={collapsed ? "Toggle theme" : undefined}
          >
            {theme === "dark" ? (
              <Sun size={20} className="shrink-0" />
            ) : (
              <Moon size={20} className="shrink-0" />
            )}
            {!collapsed && (
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            )}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut size={20} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
