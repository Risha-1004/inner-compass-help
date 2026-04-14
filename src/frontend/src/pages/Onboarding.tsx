import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCompleteOnboarding } from "@/hooks/useProfile";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Onboarding() {
  const navigate = useNavigate();
  const { mutateAsync: completeOnboarding, isPending } =
    useCompleteOnboarding();
  const [selected, setSelected] = useState<boolean | null>(null);

  const handleSubmit = async () => {
    if (selected === null) return;
    try {
      await completeOnboarding(selected);
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-2xl" role="img" aria-label="compass">
              🧭
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome to Inner Compass
          </h1>
          <p className="text-muted-foreground text-sm">
            Just one quick question to personalize your experience.
          </p>
        </div>

        <Card className="p-6 shadow-elevated border-border">
          <div className="mb-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">
              Do you have periods?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This helps us show you a cycle tracker. This is about your body,
              not your gender — everyone is welcome here.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setSelected(true)}
              className={`p-4 rounded-xl border-2 text-center transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected === true
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
              }`}
              data-ocid="onboarding-has-periods-yes"
              aria-pressed={selected === true}
            >
              <span className="text-2xl block mb-1">🌸</span>
              <span className="text-sm">Yes</span>
            </button>

            <button
              type="button"
              onClick={() => setSelected(false)}
              className={`p-4 rounded-xl border-2 text-center transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected === false
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
              }`}
              data-ocid="onboarding-has-periods-no"
              aria-pressed={selected === false}
            >
              <span className="text-2xl block mb-1">💫</span>
              <span className="text-sm">No</span>
            </button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={selected === null || isPending}
            className="w-full rounded-xl"
            size="lg"
            data-ocid="onboarding-submit"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Setting up your space…
              </>
            ) : (
              "Continue to Dashboard"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            You can change this anytime in Settings.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
