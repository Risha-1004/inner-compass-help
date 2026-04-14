import { r as reactExports, j as jsxRuntimeExports, n as Button } from "./index-Chdf2p0o.js";
const TECHNIQUES = {
  box: {
    name: "Box Breathing",
    description: "4-4-4-4 — Equal sides for focus and calm",
    color: "from-primary/30 via-accent/20 to-primary/10",
    phases: [
      { phase: "inhale", duration: 4, label: "Inhale" },
      { phase: "hold-in", duration: 4, label: "Hold" },
      { phase: "exhale", duration: 4, label: "Exhale" },
      { phase: "hold-out", duration: 4, label: "Hold" }
    ]
  },
  "478": {
    name: "4-7-8 Breathing",
    description: "4-7-8 — Nervous system reset for sleep and anxiety",
    color: "from-accent/30 via-primary/20 to-accent/10",
    phases: [
      { phase: "inhale", duration: 4, label: "Inhale" },
      { phase: "hold-in", duration: 7, label: "Hold" },
      { phase: "exhale", duration: 8, label: "Exhale" }
    ]
  },
  calm: {
    name: "Calm Breathing",
    description: "5-5 — Simple rhythm for everyday stress relief",
    color: "from-muted/60 via-primary/15 to-muted/30",
    phases: [
      { phase: "inhale", duration: 5, label: "Inhale" },
      { phase: "exhale", duration: 5, label: "Exhale" }
    ]
  }
};
const CYCLE_OPTIONS = [
  { label: "3 cycles", value: 3 },
  { label: "5 cycles", value: 5 },
  { label: "10 cycles", value: 10 },
  { label: "Unlimited", value: 0 }
];
function BreathingCircle({
  phase,
  progress,
  technique,
  isActive
}) {
  const isExpanded = phase === "inhale" || phase === "hold-in";
  const scale = isExpanded ? 1 + 0.38 * (phase === "inhale" ? progress : 1) : 1 + 0.38 * (phase === "exhale" ? 1 - progress : 0);
  const opacity = 0.55 + scale * 0.18;
  const ringScale = isExpanded ? 1 + 0.55 * (phase === "inhale" ? progress : 1) : 1 + 0.55 * (phase === "exhale" ? 1 - progress : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: 280, height: 280 },
      children: [
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute rounded-full border border-primary/20 transition-all duration-100",
            style: {
              width: 280,
              height: 280,
              transform: `scale(${ringScale * 0.75})`,
              opacity: Math.max(0, 0.4 - ringScale * 0.08)
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute rounded-full bg-gradient-to-br ${TECHNIQUES[technique].color} shadow-elevated transition-all duration-100`,
            style: {
              width: 200,
              height: 200,
              transform: `scale(${scale})`,
              opacity
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute rounded-full bg-primary/10 transition-all duration-100",
            style: {
              width: 200,
              height: 200,
              transform: `scale(${scale * 0.6})`,
              filter: "blur(12px)"
            }
          }
        )
      ]
    }
  );
}
function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
function Breathing() {
  const [technique, setTechnique] = reactExports.useState("box");
  const [cycleTarget, setCycleTarget] = reactExports.useState(5);
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [isPaused, setIsPaused] = reactExports.useState(false);
  const [isComplete, setIsComplete] = reactExports.useState(false);
  const [phaseIndex, setPhaseIndex] = reactExports.useState(0);
  const [phaseProgress, setPhaseProgress] = reactExports.useState(0);
  const [phaseElapsed, setPhaseElapsed] = reactExports.useState(0);
  const [cycle, setCycle] = reactExports.useState(1);
  const [sessionSecs, setSessionSecs] = reactExports.useState(0);
  const rafRef = reactExports.useRef(null);
  const lastTickRef = reactExports.useRef(null);
  const phases = TECHNIQUES[technique].phases;
  const currentPhase = phases[phaseIndex];
  const tick = reactExports.useCallback(
    (now) => {
      if (lastTickRef.current === null) {
        lastTickRef.current = now;
      }
      const delta = (now - lastTickRef.current) / 1e3;
      lastTickRef.current = now;
      setPhaseElapsed((prev) => {
        const next = prev + delta;
        const pct = Math.min(next / currentPhase.duration, 1);
        setPhaseProgress(pct);
        setSessionSecs((s) => s + delta);
        if (next >= currentPhase.duration) {
          setPhaseIndex((pi) => {
            const nextPi = pi + 1;
            if (nextPi >= phases.length) {
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
    [currentPhase, phases.length, cycleTarget, isComplete]
  );
  reactExports.useEffect(() => {
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
  function handleTechniqueChange(t) {
    handleStop();
    setTechnique(t);
  }
  const phaseRemaining = Math.max(
    0,
    Math.ceil(currentPhase.duration - phaseElapsed)
  );
  const cycleLabel = cycleTarget === 0 ? `Cycle ${cycle}` : `Cycle ${Math.min(cycle, cycleTarget)} of ${cycleTarget}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Breathing Exercises" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Guided techniques to calm your mind and restore balance." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: Object.keys(TECHNIQUES).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": `technique-${key}`,
        onClick: () => handleTechniqueChange(key),
        className: `rounded-xl border p-4 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${technique === key ? "bg-primary/10 border-primary text-foreground shadow-soft" : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/40"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-sm mb-0.5 text-foreground", children: TECHNIQUES[key].name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs leading-snug", children: TECHNIQUES[key].description })
        ]
      },
      key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-soft overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6 py-12 px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BreathingCircle,
            {
              phase: isRunning ? currentPhase.phase : "hold-out",
              progress: phaseProgress,
              technique,
              isActive: isRunning && !isPaused
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center min-h-[4rem] flex flex-col items-center justify-center gap-1", children: isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold text-primary", children: "Session Complete ✨" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "You finished ",
              cycleTarget === 0 ? cycle - 1 : cycleTarget,
              " ",
              "cycles in ",
              formatTime(Math.floor(sessionSecs)),
              "."
            ] })
          ] }) : isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-semibold text-foreground tracking-wide", children: isPaused ? "Paused" : currentPhase.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm tabular-nums text-muted-foreground", children: isPaused ? "—" : `${phaseRemaining}s` })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-muted-foreground", children: "Ready when you are" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Find a comfortable position and press Start" })
          ] }) })
        ] }),
        isRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-sm text-muted-foreground bg-muted/40 rounded-xl px-6 py-3 w-full max-w-xs justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground tabular-nums", children: formatTime(Math.floor(sessionSecs)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Session" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-6 bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: cycleLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Progress" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: !isRunning || isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "btn-start",
            onClick: handleStart,
            className: "px-8",
            children: isComplete ? "Breathe Again" : "Start"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "btn-pause",
              variant: "outline",
              onClick: handlePause,
              children: isPaused ? "Resume" : "Pause"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "btn-stop",
              variant: "ghost",
              onClick: handleStop,
              className: "text-muted-foreground",
              children: "Stop"
            }
          )
        ] }) })
      ] }),
      !isComplete && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-muted/20 px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-center", children: phases.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-1 min-w-[60px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-1.5 w-full rounded-full bg-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-100",
                style: {
                  width: i < phaseIndex ? "100%" : i === phaseIndex && isRunning && !isPaused ? `${phaseProgress * 100}%` : "0%"
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              p.label,
              " ",
              p.duration,
              "s"
            ] })
          ]
        },
        `${p.phase}-${i}`
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Session Length" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CYCLE_OPTIONS.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `cycle-${value}`,
          onClick: () => setCycleTarget(value),
          disabled: isRunning && !isComplete,
          className: `px-4 py-2 rounded-lg text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed ${cycleTarget === value ? "bg-primary text-primary-foreground shadow-soft" : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"}`,
          children: label
        },
        value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-3", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: phases.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 shadow-soft",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-primary", children: i + 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: p.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-2", children: [
                p.duration,
                "s"
              ] })
            ] })
          ]
        },
        `${p.phase}-guide-${i}`
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-4 leading-relaxed", children: "For best results, sit comfortably with your back straight. Breathe in slowly through your nose and exhale through your mouth. Repeat consistently and allow your body to relax with each cycle." })
    ] })
  ] });
}
export {
  Breathing as default
};
