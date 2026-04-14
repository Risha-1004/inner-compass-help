import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type TechniqueName = "box" | "478" | "calm";
type Phase = "inhale" | "hold-in" | "exhale" | "hold-out";
type CycleCount = 3 | 5 | 10 | 0;

interface Technique {
  name: string;
  description: string;
  phases: { phase: Phase; duration: number; label: string }[];
  color: string;
}

// ─── Technique definitions ───────────────────────────────────────────────────
const TECHNIQUES: Record<TechniqueName, Technique> = {
  box: {
    name: "Box Breathing",
    description: "4-4-4-4 — Equal sides for focus and calm",
    color: "from-primary/30 via-accent/20 to-primary/10",
    phases: [
      { phase: "inhale", duration: 4, label: "Inhale" },
      { phase: "hold-in", duration: 4, label: "Hold" },
      { phase: "exhale", duration: 4, label: "Exhale" },
      { phase: "hold-out", duration: 4, label: "Hold" },
    ],
  },
  "478": {
    name: "4-7-8 Breathing",
    description: "4-7-8 — Nervous system reset for sleep and anxiety",
    color: "from-accent/30 via-primary/20 to-accent/10",
    phases: [
      { phase: "inhale", duration: 4, label: "Inhale" },
      { phase: "hold-in", duration: 7, label: "Hold" },
      { phase: "exhale", duration: 8, label: "Exhale" },
    ],
  },
  calm: {
    name: "Calm Breathing",
    description: "5-5 — Simple rhythm for everyday stress relief",
    color: "from-muted/60 via-primary/15 to-muted/30",
    phases: [
      { phase: "inhale", duration: 5, label: "Inhale" },
      { phase: "exhale", duration: 5, label: "Exhale" },
    ],
  },
};

const CYCLE_OPTIONS: { label: string; value: CycleCount }[] = [
  { label: "3 cycles", value: 3 },
  { label: "5 cycles", value: 5 },
  { label: "10 cycles", value: 10 },
  { label: "Unlimited", value: 0 },
];

// ─── Circle animation ─────────────────────────────────────────────────────────
function BreathingCircle({
  phase,
  progress,
  technique,
  isActive,
}: {
  phase: Phase;
  progress: number;
  technique: TechniqueName;
  isActive: boolean;
}) {
  const isExpanded = phase === "inhale" || phase === "hold-in";
  const scale = isExpanded
    ? 1 + 0.38 * (phase === "inhale" ? progress : 1)
    : 1 + 0.38 * (phase === "exhale" ? 1 - progress : 0);
  const opacity = 0.55 + scale * 0.18;
  const ringScale = isExpanded
    ? 1 + 0.55 * (phase === "inhale" ? progress : 1)
    : 1 + 0.55 * (phase === "exhale" ? 1 - progress : 0);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 280, height: 280 }}
    >
      {/* Outer pulse ring */}
      {isActive && (
        <div
          className="absolute rounded-full border border-primary/20 transition-all duration-100"
          style={{
            width: 280,
            height: 280,
            transform: `scale(${ringScale * 0.75})`,
            opacity: Math.max(0, 0.4 - ringScale * 0.08),
          }}
        />
      )}
      {/* Main breathing circle */}
      <div
        className={`absolute rounded-full bg-gradient-to-br ${TECHNIQUES[technique].color} shadow-elevated transition-all duration-100`}
        style={{
          width: 200,
          height: 200,
          transform: `scale(${scale})`,
          opacity,
        }}
      />
      {/* Inner glow */}
      <div
        className="absolute rounded-full bg-primary/10 transition-all duration-100"
        style={{
          width: 200,
          height: 200,
          transform: `scale(${scale * 0.6})`,
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}

// ─── Format seconds ───────────────────────────────────────────────────────────
function formatTime(secs: number) {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Breathing() {
  const [technique, setTechnique] = useState<TechniqueName>("box");
  const [cycleTarget, setCycleTarget] = useState<CycleCount>(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0); // 0..1
  const [phaseElapsed, setPhaseElapsed] = useState(0); // seconds
  const [cycle, setCycle] = useState(1);
  const [sessionSecs, setSessionSecs] = useState(0);

  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  const phases = TECHNIQUES[technique].phases;
  const currentPhase = phases[phaseIndex];

  const tick = useCallback(
    (now: number) => {
      if (lastTickRef.current === null) {
        lastTickRef.current = now;
      }
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      setPhaseElapsed((prev) => {
        const next = prev + delta;
        const pct = Math.min(next / currentPhase.duration, 1);
        setPhaseProgress(pct);
        setSessionSecs((s) => s + delta);

        if (next >= currentPhase.duration) {
          // advance phase
          setPhaseIndex((pi) => {
            const nextPi = pi + 1;
            if (nextPi >= phases.length) {
              // completed a full cycle
              setCycle((c) => {
                const nextCycle = c + 1;
                if (cycleTarget !== 0 && nextCycle > cycleTarget) {
                  setIsRunning(false);
                  setIsComplete(true);
                  return c;
                }
                return nextCycle;
              });
              return 0;
            }
            return nextPi;
          });
          return 0;
        }
        return next;
      });

      if (!isComplete) {
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [currentPhase, phases.length, cycleTarget, isComplete],
  );

  useEffect(() => {
    if (isRunning && !isPaused && !isComplete) {
      lastTickRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isRunning, isPaused, isComplete, tick]);

  function handleStart() {
    setIsComplete(false);
    setPhaseIndex(0);
    setPhaseProgress(0);
    setPhaseElapsed(0);
    setCycle(1);
    setSessionSecs(0);
    setIsPaused(false);
    setIsRunning(true);
  }

  function handlePause() {
    setIsPaused((p) => !p);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }

  function handleStop() {
    setIsRunning(false);
    setIsPaused(false);
    setIsComplete(false);
    setPhaseIndex(0);
    setPhaseProgress(0);
    setPhaseElapsed(0);
    setCycle(1);
    setSessionSecs(0);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }

  function handleTechniqueChange(t: TechniqueName) {
    handleStop();
    setTechnique(t);
  }

  const phaseRemaining = Math.max(
    0,
    Math.ceil(currentPhase.duration - phaseElapsed),
  );
  const cycleLabel =
    cycleTarget === 0
      ? `Cycle ${cycle}`
      : `Cycle ${Math.min(cycle, cycleTarget)} of ${cycleTarget}`;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Breathing Exercises
        </h1>
        <p className="text-muted-foreground mt-1">
          Guided techniques to calm your mind and restore balance.
        </p>
      </div>

      {/* Technique selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(Object.keys(TECHNIQUES) as TechniqueName[]).map((key) => (
          <button
            type="button"
            key={key}
            data-ocid={`technique-${key}`}
            onClick={() => handleTechniqueChange(key)}
            className={`rounded-xl border p-4 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              technique === key
                ? "bg-primary/10 border-primary text-foreground shadow-soft"
                : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/40"
            }`}
          >
            <div className="font-display font-semibold text-sm mb-0.5 text-foreground">
              {TECHNIQUES[key].name}
            </div>
            <div className="text-xs leading-snug">
              {TECHNIQUES[key].description}
            </div>
          </button>
        ))}
      </div>

      {/* Main breathing area */}
      <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
        <div className="flex flex-col items-center gap-6 py-12 px-6">
          {/* Circle + phase label */}
          <div className="flex flex-col items-center gap-6">
            <BreathingCircle
              phase={isRunning ? currentPhase.phase : "hold-out"}
              progress={phaseProgress}
              technique={technique}
              isActive={isRunning && !isPaused}
            />

            {/* Phase label */}
            <div className="text-center min-h-[4rem] flex flex-col items-center justify-center gap-1">
              {isComplete ? (
                <>
                  <p className="font-display text-2xl font-semibold text-primary">
                    Session Complete ✨
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You finished {cycleTarget === 0 ? cycle - 1 : cycleTarget}{" "}
                    cycles in {formatTime(Math.floor(sessionSecs))}.
                  </p>
                </>
              ) : isRunning ? (
                <>
                  <p className="font-display text-3xl font-semibold text-foreground tracking-wide">
                    {isPaused ? "Paused" : currentPhase.label}
                  </p>
                  <p className="text-sm tabular-nums text-muted-foreground">
                    {isPaused ? "—" : `${phaseRemaining}s`}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display text-xl text-muted-foreground">
                    Ready when you are
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    Find a comfortable position and press Start
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Session stats bar */}
          {isRunning && (
            <div className="flex items-center gap-6 text-sm text-muted-foreground bg-muted/40 rounded-xl px-6 py-3 w-full max-w-xs justify-center">
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-display font-semibold text-foreground tabular-nums">
                  {formatTime(Math.floor(sessionSecs))}
                </span>
                <span className="text-xs">Session</span>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-display font-semibold text-foreground">
                  {cycleLabel}
                </span>
                <span className="text-xs">Progress</span>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-3">
            {!isRunning || isComplete ? (
              <Button
                data-ocid="btn-start"
                onClick={handleStart}
                className="px-8"
              >
                {isComplete ? "Breathe Again" : "Start"}
              </Button>
            ) : (
              <>
                <Button
                  data-ocid="btn-pause"
                  variant="outline"
                  onClick={handlePause}
                >
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button
                  data-ocid="btn-stop"
                  variant="ghost"
                  onClick={handleStop}
                  className="text-muted-foreground"
                >
                  Stop
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Phase timeline strip */}
        {!isComplete && (
          <div className="border-t border-border bg-muted/20 px-6 py-4">
            <div className="flex gap-2 justify-center">
              {phases.map((p, i) => (
                <div
                  key={`${p.phase}-${i}`}
                  className="flex flex-col items-center gap-1 min-w-[60px]"
                >
                  <div className="relative h-1.5 w-full rounded-full bg-border overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-100"
                      style={{
                        width:
                          i < phaseIndex
                            ? "100%"
                            : i === phaseIndex && isRunning && !isPaused
                              ? `${phaseProgress * 100}%`
                              : "0%",
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {p.label} {p.duration}s
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cycle count selector */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
        <h3 className="font-display font-semibold text-foreground mb-4">
          Session Length
        </h3>
        <div className="flex flex-wrap gap-2">
          {CYCLE_OPTIONS.map(({ label, value }) => (
            <button
              type="button"
              key={value}
              data-ocid={`cycle-${value}`}
              onClick={() => setCycleTarget(value)}
              disabled={isRunning && !isComplete}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed ${
                cycleTarget === value
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Technique guide */}
      <div className="bg-muted/30 border border-border rounded-2xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-3">
          How it works
        </h3>
        <div className="flex flex-wrap gap-3">
          {phases.map((p, i) => (
            <div
              key={`${p.phase}-guide-${i}`}
              className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 shadow-soft"
            >
              <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">
                  {p.label}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  {p.duration}s
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          For best results, sit comfortably with your back straight. Breathe in
          slowly through your nose and exhale through your mouth. Repeat
          consistently and allow your body to relax with each cycle.
        </p>
      </div>
    </div>
  );
}
