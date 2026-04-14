import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart2,
  BookMarked,
  BookOpen,
  CheckSquare,
  ClipboardList,
  Droplets,
  Heart,
  LayoutDashboard,
  MessageCircle,
  Moon,
  Settings,
  ShieldAlert,
  Smile,
  Sparkles,
  Target,
  Wind,
  X,
} from "lucide-react";

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  requiresPeriods?: boolean;
}

const navItems: NavItem[] = [
  { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { to: "/mood", icon: <Smile size={20} />, label: "Mood" },
  { to: "/habits", icon: <CheckSquare size={20} />, label: "Habits" },
  { to: "/journal", icon: <BookOpen size={20} />, label: "Journal" },
  { to: "/goals", icon: <Target size={20} />, label: "Goals" },
  { to: "/sleep", icon: <Moon size={20} />, label: "Sleep" },
  { to: "/water", icon: <Droplets size={20} />, label: "Water" },
  {
    to: "/cycle",
    icon: <Heart size={20} />,
    label: "Cycle",
    requiresPeriods: true,
  },
  { to: "/breathing", icon: <Wind size={20} />, label: "Breathing" },
  { to: "/wellness", icon: <Sparkles size={20} />, label: "Wellness" },
  { to: "/quizzes", icon: <ClipboardList size={20} />, label: "Quizzes" },
  { to: "/safety", icon: <ShieldAlert size={20} />, label: "Safety Plan" },
  { to: "/insights", icon: <BarChart2 size={20} />, label: "Insights" },
  { to: "/resources", icon: <BookMarked size={20} />, label: "Resources" },
  { to: "/contact", icon: <MessageCircle size={20} />, label: "Contact" },
  { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
];

export function Sidebar() {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const { data: profile } = useProfile();
  const hasPeriods = profile?.onboarding?.hasPeriods === true;

  const visibleItems = navItems.filter(
    (item) => !item.requiresPeriods || hasPeriods,
  );

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyUp={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-30 h-full flex flex-col bg-sidebar border-r border-sidebar-border transition-smooth",
          "shadow-elevated",
          sidebarOpen ? "w-56" : "w-0 md:w-16 overflow-hidden",
        )}
        data-ocid="sidebar-nav"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border shrink-0">
          {sidebarOpen && (
            <span className="font-display font-semibold text-sidebar-foreground text-sm leading-tight">
              Inner Compass
            </span>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-smooth md:hidden"
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {visibleItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => {
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-smooth min-w-0",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
                aria-current={active ? "page" : undefined}
                data-ocid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                <span className="shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Branding */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-t border-sidebar-border text-xs text-sidebar-foreground/50 shrink-0">
            Built with love ·{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-sidebar-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
