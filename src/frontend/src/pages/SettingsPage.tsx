import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import {
  useCompleteOnboarding,
  useProfile,
  useUpdatePreferences,
} from "@/hooks/useProfile";
import { useAppStore } from "@/store/useAppStore";
import type { FontSize, Theme } from "@/types";
import { Check, LogOut, Moon, Sunset, Wind } from "lucide-react";
import { toast } from "sonner";

// ─── Theme data ───────────────────────────────────────────────────────────────

const THEMES: {
  id: Theme;
  name: string;
  icon: React.ReactNode;
  gradient: string;
  accentClass: string;
}[] = [
  {
    id: "cloud",
    name: "Cloud",
    icon: <Wind size={14} />,
    gradient:
      "linear-gradient(135deg, oklch(0.90 0.04 240), oklch(0.97 0.01 220))",
    accentClass: "bg-[oklch(0.65_0.11_270)]",
  },
  {
    id: "ocean",
    name: "Ocean",
    icon: <Moon size={14} />,
    gradient:
      "linear-gradient(135deg, oklch(0.18 0.02 240), oklch(0.28 0.03 250))",
    accentClass: "bg-[oklch(0.72_0.18_190)]",
  },
  {
    id: "sunset",
    name: "Sunset",
    icon: <Sunset size={14} />,
    gradient:
      "linear-gradient(135deg, oklch(0.92 0.05 45), oklch(0.82 0.10 30))",
    accentClass: "bg-[oklch(0.75_0.18_25)]",
  },
  {
    id: "night",
    name: "Night",
    icon: <Moon size={14} />,
    gradient:
      "linear-gradient(135deg, oklch(0.16 0.01 260), oklch(0.22 0.02 270))",
    accentClass: "bg-[oklch(0.68_0.14_270)]",
  },
];

// ─── Font size data ───────────────────────────────────────────────────────────

const FONT_SIZES: { id: FontSize; label: string; display: string }[] = [
  { id: "sm", label: "A−", display: "Small" },
  { id: "base", label: "A", display: "Default" },
  { id: "lg", label: "A+", display: "Large" },
];

// ─── Section wrapper ──────────────────────────────────────────────────────────

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-foreground text-sm uppercase tracking-wider">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const {
    theme,
    fontSize,
    highContrast,
    setTheme,
    setFontSize,
    setHighContrast,
  } = useAppStore();
  const { data: profile } = useProfile();
  const { logout } = useAuth();
  const updatePrefs = useUpdatePreferences();
  const completeOnboarding = useCompleteOnboarding();

  const hasPeriods = profile?.onboarding?.hasPeriods ?? false;

  async function savePrefs(
    overrides: Partial<{
      theme: string;
      fontSize: string;
      highContrast: boolean;
    }>,
  ) {
    try {
      await updatePrefs.mutateAsync({
        theme: overrides.theme ?? theme,
        fontSize: overrides.fontSize ?? fontSize,
        highContrast: overrides.highContrast ?? highContrast,
      });
    } catch {
      toast.error("Could not save preference — please try again.");
    }
  }

  function handleTheme(t: Theme) {
    setTheme(t);
    savePrefs({ theme: t });
  }

  function handleFontSize(s: FontSize) {
    setFontSize(s);
    savePrefs({ fontSize: s });
  }

  function handleHighContrast(val: boolean) {
    setHighContrast(val);
    savePrefs({ highContrast: val });
  }

  async function handlePeriodToggle(val: boolean) {
    try {
      await completeOnboarding.mutateAsync(val);
      toast.success(
        val ? "Period tracking enabled." : "Period tracking disabled.",
      );
    } catch {
      toast.error("Could not update — please try again.");
    }
  }

  return (
    <div className="max-w-xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Personalise your experience. Changes apply immediately.
        </p>
      </div>

      {/* Visual Theme */}
      <SettingsSection title="Visual Theme">
        <Card className="bg-card border-border shadow-soft">
          <CardContent className="pt-5 pb-5">
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              data-ocid="theme-selector"
            >
              {THEMES.map((t) => {
                const active = theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTheme(t.id)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active
                        ? "border-primary shadow-elevated"
                        : "border-border hover:border-primary/40"
                    }`}
                    aria-label={`${t.name} theme${active ? " (selected)" : ""}`}
                    aria-pressed={active}
                    data-ocid={`theme-btn-${t.id}`}
                  >
                    {/* Gradient swatch */}
                    <div
                      className="h-14 w-full"
                      style={{ background: t.gradient }}
                    />
                    {/* Accent strip */}
                    <div className={`h-2 w-full ${t.accentClass}`} />
                    {/* Label */}
                    <div className="flex items-center justify-between px-2 py-1.5 bg-card">
                      <span className="text-xs font-medium text-foreground">
                        {t.name}
                      </span>
                      {active && (
                        <Check
                          size={12}
                          className="text-primary"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </SettingsSection>

      {/* Font Size */}
      <SettingsSection title="Font Size">
        <Card className="bg-card border-border shadow-soft">
          <CardContent className="pt-5 pb-5 space-y-4">
            <div
              className="flex items-center gap-2"
              data-ocid="font-size-selector"
            >
              {FONT_SIZES.map((s) => {
                const active = fontSize === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleFontSize(s.id)}
                    aria-label={`${s.display} font size`}
                    aria-pressed={active}
                    data-ocid={`font-size-btn-${s.id}`}
                    className={`flex-1 rounded-lg border-2 py-2 font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-muted text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <span
                      className={
                        s.id === "sm"
                          ? "preview-size-sm"
                          : s.id === "lg"
                            ? "preview-size-lg"
                            : "preview-size-base"
                      }
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Live preview */}
            <div className="rounded-lg bg-muted px-4 py-3">
              <p
                className={`text-foreground leading-relaxed ${
                  fontSize === "sm"
                    ? "preview-live-sm"
                    : fontSize === "lg"
                      ? "preview-live-lg"
                      : "preview-live-base"
                }`}
              >
                Preview: "You are resilient and worthy of care."
              </p>
            </div>
          </CardContent>
        </Card>
      </SettingsSection>

      {/* Accessibility */}
      <SettingsSection title="Accessibility">
        <Card className="bg-card border-border shadow-soft">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-foreground text-sm">
                  High contrast mode
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Increases colour contrast for improved readability.
                </p>
              </div>
              <Switch
                checked={highContrast}
                onCheckedChange={handleHighContrast}
                aria-label="Toggle high contrast mode"
                data-ocid="high-contrast-toggle"
              />
            </div>
          </CardContent>
        </Card>
      </SettingsSection>

      {/* Period Tracking */}
      <SettingsSection title="Period Tracking">
        <Card className="bg-card border-border shadow-soft">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-foreground text-sm">
                  Do you track your period?
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Enables the cycle tracker in your sidebar. You can change this
                  at any time.
                </p>
              </div>
              <Switch
                checked={hasPeriods}
                onCheckedChange={handlePeriodToggle}
                disabled={completeOnboarding.isPending}
                aria-label="Toggle period tracking"
                data-ocid="period-tracking-toggle"
              />
            </div>
          </CardContent>
        </Card>
      </SettingsSection>

      {/* Logout */}
      <Separator />
      <div data-ocid="logout-section">
        <Button
          variant="destructive"
          className="w-full sm:w-auto"
          onClick={logout}
          data-ocid="logout-btn"
        >
          <LogOut size={15} className="mr-2" />
          Sign out
        </Button>
        <p className="text-muted-foreground text-xs mt-2">
          You will be returned to the home screen.
        </p>
      </div>
    </div>
  );
}
