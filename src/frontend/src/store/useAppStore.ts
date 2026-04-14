import type { FontSize, Theme, UserProfile } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  theme: Theme;
  fontSize: FontSize;
  highContrast: boolean;
  profile: UserProfile | null;
  sidebarOpen: boolean;

  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  setHighContrast: (val: boolean) => void;
  setProfile: (profile: UserProfile | null) => void;
  setSidebarOpen: (open: boolean) => void;
}

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.classList.remove(
    "theme-cloud",
    "theme-ocean",
    "theme-sunset",
    "theme-night",
  );
  if (theme !== "cloud") {
    html.classList.add(`theme-${theme}`);
  }
}

function applyFontSize(size: FontSize) {
  const html = document.documentElement;
  html.classList.remove(
    "text-size-small",
    "text-size-default",
    "text-size-large",
  );
  const map: Record<FontSize, string> = {
    sm: "text-size-small",
    base: "text-size-default",
    lg: "text-size-large",
  };
  html.classList.add(map[size]);
}

function applyHighContrast(val: boolean) {
  if (val) {
    document.documentElement.classList.add("high-contrast");
  } else {
    document.documentElement.classList.remove("high-contrast");
  }
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "cloud",
      fontSize: "base",
      highContrast: false,
      profile: null,
      sidebarOpen: true,

      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      setFontSize: (fontSize) => {
        applyFontSize(fontSize);
        set({ fontSize });
      },
      setHighContrast: (highContrast) => {
        applyHighContrast(highContrast);
        set({ highContrast });
      },
      setProfile: (profile) => set({ profile }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    {
      name: "inner-compass-prefs",
      partialize: (s) => ({
        theme: s.theme,
        fontSize: s.fontSize,
        highContrast: s.highContrast,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
          applyFontSize(state.fontSize);
          applyHighContrast(state.highContrast);
        }
      },
    },
  ),
);
