import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function Layout() {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-smooth",
          sidebarOpen ? "md:pl-56" : "md:pl-16",
        )}
      >
        <TopBar />
        <main
          className="flex-1 pt-16 p-4 md:p-6 bg-background"
          data-ocid="main-content"
        >
          <Outlet />
        </main>
        <footer className="py-4 px-6 bg-muted/40 border-t border-border text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Inner Compass Help. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              window.location.hostname,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}
