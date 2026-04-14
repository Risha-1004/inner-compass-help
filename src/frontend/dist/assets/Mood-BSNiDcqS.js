import { r as reactExports, j as jsxRuntimeExports, m as motion, C as Card, k as CardHeader, l as CardTitle, e as CardContent, n as Button, S as Skeleton, b as useQuery, o as useQueryClient, p as useMutation, h as useActor, q as ue, i as createActor } from "./index-Chdf2p0o.js";
import { T as Textarea } from "./textarea-DaWkEaNe.js";
import { A as AnimatePresence } from "./index-BBuRJ3Ez.js";
import { T as Trash2 } from "./trash-2-CFcnQdCp.js";
function useBackendActor() {
  return useActor(createActor);
}
function nDaysAgo(n) {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}
function today() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function useMoodEntries(days) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["moodEntries", days],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMoodEntries(nDaysAgo(days - 1), today());
    },
    enabled: !!actor && !isFetching
  });
}
function useLogMood() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      date,
      emoji,
      score,
      note
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.logMood(date, emoji, score, note);
      if (result.__kind__ === "err") throw new Error("Failed to log mood");
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["moodEntries"] });
      ue.success("Mood logged! 🌟");
    },
    onError: () => ue.error("Could not save mood. Please try again.")
  });
}
function useDeleteMoodEntry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteMoodEntry(id);
      if (result.__kind__ === "err") throw new Error("Delete failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["moodEntries"] });
      ue.success("Entry removed");
    },
    onError: () => ue.error("Could not delete entry.")
  });
}
const MOODS = [
  { emoji: "😔", score: 1, label: "Struggling" },
  { emoji: "😟", score: 2, label: "Low" },
  { emoji: "😐", score: 3, label: "Okay" },
  { emoji: "😊", score: 4, label: "Good" },
  { emoji: "😄", score: 5, label: "Great" }
];
function MoodChart({ entries }) {
  const sorted = reactExports.useMemo(() => {
    const last14 = [...entries].filter((e) => e.date >= nDaysAgo(13)).sort((a, b) => a.date.localeCompare(b.date));
    const byDate = /* @__PURE__ */ new Map();
    for (const e of last14) byDate.set(e.date, e);
    return Array.from(byDate.entries()).map(([date, entry]) => ({
      date,
      score: Number(entry.score),
      emoji: entry.emoji
    }));
  }, [entries]);
  if (sorted.length === 0) return null;
  const formatLabel = (dateStr) => {
    const d = /* @__PURE__ */ new Date(`${dateStr}T00:00:00`);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "14-Day Mood Trend" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1.5 h-24", "aria-label": "Mood chart", children: sorted.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-1 flex-1 min-w-0",
          title: `${formatLabel(item.date)}: ${item.emoji} (${item.score}/5)`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "w-full rounded-t-md bg-primary/70 hover:bg-primary transition-colors duration-200",
                style: { height: `${item.score / 5 * 80}px` },
                initial: { scaleY: 0, originY: 1 },
                animate: { scaleY: 1 },
                transition: { delay: i * 0.04, duration: 0.4, ease: "easeOut" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground truncate w-full text-center hidden sm:block", children: formatLabel(item.date).split(" ")[1] })
          ]
        },
        item.date
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatLabel(sorted[0].date) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatLabel(sorted[sorted.length - 1].date) })
      ] })
    ] })
  ] });
}
function MoodHistoryItem({
  entry,
  onDelete,
  isDeleting
}) {
  const d = /* @__PURE__ */ new Date(`${entry.date}T00:00:00`);
  const label = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, x: -16 },
      className: "flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-smooth group",
      "data-ocid": "mood-history-item",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-2xl leading-none flex-shrink-0",
            role: "img",
            "aria-label": `Score ${entry.score}`,
            children: entry.emoji
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Score ",
              Number(entry.score),
              "/5"
            ] })
          ] }),
          entry.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: entry.note })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "opacity-0 group-hover:opacity-100 transition-smooth h-7 w-7 flex-shrink-0",
            onClick: () => onDelete(entry.id),
            disabled: isDeleting,
            "aria-label": "Delete mood entry",
            "data-ocid": "mood-delete-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 text-destructive" })
          }
        )
      ]
    }
  );
}
function Mood() {
  const [selectedScore, setSelectedScore] = reactExports.useState(null);
  const [note, setNote] = reactExports.useState("");
  const { data: recentEntries = [], isLoading } = useMoodEntries(14);
  const logMood = useLogMood();
  const deleteMood = useDeleteMoodEntry();
  const last7Entries = reactExports.useMemo(() => {
    const cutoff = nDaysAgo(6);
    return [...recentEntries].filter((e) => e.date >= cutoff).sort((a, b) => b.date.localeCompare(a.date));
  }, [recentEntries]);
  const alreadyLoggedToday = reactExports.useMemo(
    () => recentEntries.some((e) => e.date === today()),
    [recentEntries]
  );
  const handleLog = () => {
    if (!selectedScore) return;
    const mood = MOODS.find((m) => m.score === selectedScore);
    logMood.mutate(
      {
        date: today(),
        emoji: mood.emoji,
        score: BigInt(mood.score),
        note: note.trim() || null
      },
      {
        onSuccess: () => {
          setSelectedScore(null);
          setNote("");
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl mx-auto pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Mood Tracker" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Check in with yourself daily — every feeling is valid." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1, duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: alreadyLoggedToday ? "You've checked in today ✨" : "How are you feeling right now?" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex justify-between gap-2",
                "aria-label": "Select mood",
                "data-ocid": "mood-emoji-selector",
                children: MOODS.map((mood) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "aria-pressed": selectedScore === mood.score,
                    onClick: () => setSelectedScore(
                      selectedScore === mood.score ? null : mood.score
                    ),
                    className: `flex flex-col items-center gap-1.5 flex-1 py-3 px-1 rounded-xl transition-smooth hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedScore === mood.score ? "bg-primary/15 ring-2 ring-primary" : "bg-muted/40"}`,
                    "data-ocid": `mood-option-${mood.score}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-3xl sm:text-4xl leading-none",
                          role: "img",
                          "aria-label": mood.label,
                          children: mood.emoji
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground font-medium", children: mood.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground/70", children: [
                        mood.score,
                        "/5"
                      ] })
                    ]
                  },
                  mood.score
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedScore !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                transition: { duration: 0.25 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    placeholder: "Add a note about how you're feeling (optional)…",
                    value: note,
                    onChange: (e) => setNote(e.target.value),
                    className: "resize-none bg-muted/40 border-border text-sm",
                    rows: 3,
                    "data-ocid": "mood-note-input"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleLog,
                disabled: !selectedScore || logMood.isPending,
                className: "w-full",
                "data-ocid": "mood-log-btn",
                children: logMood.isPending ? "Saving…" : "Log Mood"
              }
            )
          ] })
        ] })
      }
    ),
    !isLoading && recentEntries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2, duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MoodChart, { entries: recentEntries })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.25, duration: 0.4 },
        className: "space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Past 7 Days" }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }, i)) }) : last7Entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-12 rounded-xl bg-muted/30 text-center",
              "data-ocid": "mood-empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl mb-3", children: "🌱" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No entries yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Log your first mood above to get started" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: last7Entries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MoodHistoryItem,
            {
              entry,
              onDelete: deleteMood.mutate,
              isDeleting: deleteMood.isPending
            },
            String(entry.id)
          )) }) })
        ]
      }
    )
  ] });
}
export {
  Mood as default
};
