import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function Landing() {
  const { isAuthenticated, login } = useAuth();
  const { data: profile, isFetched } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!isFetched) return;
    if (profile && !profile.onboarding.completed) {
      navigate({ to: "/onboarding" });
    } else if (profile) {
      navigate({ to: "/dashboard" });
    } else {
      navigate({ to: "/onboarding" });
    }
  }, [isAuthenticated, isFetched, profile, navigate]);

  const isLoading = isAuthenticated && !isFetched;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden
        >
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/8 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 max-w-2xl"
        >
          {/* Logo mark */}
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-soft">
            <span className="text-3xl" role="img" aria-label="compass">
              🧭
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            Inner Compass Help
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-2 max-w-xl mx-auto leading-relaxed">
            Your safe space for mental and physical well-being.
          </p>
          <p className="text-base text-muted-foreground mb-10 max-w-lg mx-auto">
            Guided support, every step of the way.
          </p>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 size={18} className="animate-spin" />
              <span>Loading your space…</span>
            </div>
          ) : !isAuthenticated ? (
            <Button
              size="lg"
              onClick={login}
              className="px-8 py-3 text-base rounded-full shadow-elevated hover:shadow-soft transition-smooth"
              data-ocid="sign-in-btn"
            >
              Sign in with Internet Identity
            </Button>
          ) : null}

          {!isAuthenticated && (
            <p className="mt-4 text-xs text-muted-foreground">
              Secure, passwordless sign-in — no email required
            </p>
          )}
        </motion.div>

        {/* Feature pills */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative z-10 mt-12 flex flex-wrap justify-center gap-2"
          >
            {[
              "Mood Tracking",
              "Habit Tracker",
              "Journaling",
              "Sleep Log",
              "Breathing Exercises",
              "Cycle Tracker",
              "Goal Setting",
              "Safety Plan",
            ].map((feature) => (
              <span
                key={feature}
                className="px-3 py-1.5 rounded-full bg-card border border-border text-xs text-muted-foreground shadow-soft"
              >
                {feature}
              </span>
            ))}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 bg-card border-t border-border text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()} Inner Compass Help ·{" "}
        <a
          href="mailto:innercompasshelp42@gmail.com"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Contact
        </a>{" "}
        ·{" "}
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
  );
}
