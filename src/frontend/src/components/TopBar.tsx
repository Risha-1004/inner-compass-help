import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useDailyAffirmation } from "@/hooks/useProfile";
import { useAppStore } from "@/store/useAppStore";
import type { Theme } from "@/types";
import { Cloud, LogOut, Menu, Moon, Sun, Waves } from "lucide-react";

const themes: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: "cloud", label: "Cloud", icon: <Cloud size={14} /> },
  { id: "ocean", label: "Ocean", icon: <Waves size={14} /> },
  { id: "sunset", label: "Sunset", icon: <Sun size={14} /> },
  { id: "night", label: "Night", icon: <Moon size={14} /> },
];

export function TopBar() {
  const { theme, setTheme, setSidebarOpen, sidebarOpen } = useAppStore();
  const { logout, isAuthenticated } = useAuth();
  const { data: affirmation } = useDailyAffirmation();

  return (
    <header
      className="fixed top-0 right-0 z-10 flex items-center h-16 px-4 bg-card border-b border-border shadow-soft transition-smooth"
      style={{ left: "inherit" }}
      data-ocid="topbar"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
          data-ocid="topbar-menu-toggle"
        >
          <Menu size={20} />
        </Button>

        {/* Affirmation */}
        {affirmation && (
          <p className="hidden md:block text-sm text-muted-foreground italic truncate max-w-md">
            "{affirmation}"
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Theme switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs"
              data-ocid="theme-switcher"
            >
              {themes.find((t) => t.id === theme)?.icon}
              <span className="hidden sm:inline capitalize">{theme}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            {themes.map((t) => (
              <DropdownMenuItem
                key={t.id}
                onClick={() => setTheme(t.id)}
                className="gap-2 text-sm"
                data-ocid={`theme-option-${t.id}`}
              >
                {t.icon}
                {t.label}
                {theme === t.id && (
                  <Badge variant="secondary" className="ml-auto text-xs py-0">
                    Active
                  </Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-8 bg-primary/10 text-primary hover:bg-primary/20"
                aria-label="User menu"
                data-ocid="user-menu-trigger"
              >
                <span className="text-sm font-semibold">✦</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="gap-2 text-sm text-destructive focus:text-destructive"
                data-ocid="logout-btn"
              >
                <LogOut size={14} />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
