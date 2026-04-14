import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { MoodEntry } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Backend hooks ─────────────────────────────────────────────────────────────

function useBackendActor() {
  return useActor(createActor);
}

function nDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function useMoodEntries(days: number) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<MoodEntry[]>({
    queryKey: ["moodEntries", days],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMoodEntries(nDaysAgo(days - 1), today());
    },
    enabled: !!actor && !isFetching,
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
      note,
    }: {
      date: string;
      emoji: string;
      score: bigint;
      note: string | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.logMood(date, emoji, score, note);
      if (result.__kind__ === "err") throw new Error("Failed to log mood");
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["moodEntries"] });
      toast.success("Mood logged! 🌟");
    },
    onError: () => toast.error("Could not save mood. Please try again."),
  });
}

function useDeleteMoodEntry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteMoodEntry(id);
      if (result.__kind__ === "err") throw new Error("Delete failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["moodEntries"] });
      toast.success("Entry removed");
    },
    onError: () => toast.error("Could not delete entry."),
  });
}

// ─── Mood options ──────────────────────────────────────────────────────────────

const MOODS = [
  { emoji: "😔", score: 1, label: "Struggling" },
  { emoji: "😟", score: 2, label: "Low" },
  { emoji: "😐", score: 3, label: "Okay" },
  { emoji: "😊", score: 4, label: "Good" },
  { emoji: "😄", score: 5, label: "Great" },
];

// ─── Mini bar chart ────────────────────────────────────────────────────────────

function MoodChart({ entries }: { entries: MoodEntry[] }) {
  const sorted = useMemo(() => {
    const last14 = [...entries]
      .filter((e) => e.date >= nDaysAgo(13))
      .sort((a, b) => a.date.localeCompare(b.date));
    // Deduplicate by date — keep last entry per date
    const byDate = new Map<string, MoodEntry>();
    for (const e of last14) byDate.set(e.date, e);
    return Array.from(byDate.entries()).map(([date, entry]) => ({
      date,
      score: Number(entry.score),
      emoji: entry.emoji,
    }));
  }, [entries]);

  if (sorted.length === 0) return null;

  const formatLabel = (dateStr: string) => {
    const d = new Date(`${dateStr}T00:00:00`);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          14-Day Mood Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1.5 h-24" aria-label="Mood chart">
          {sorted.map((item, i) => (
            <div
              key={item.date}
              className="flex flex-col items-center gap-1 flex-1 min-w-0"
              title={`${formatLabel(item.date)}: ${item.emoji} (${item.score}/5)`}
            >
              <motion.div
                className="w-full rounded-t-md bg-primary/70 hover:bg-primary transition-colors duration-200"
                style={{ height: `${(item.score / 5) * 80}px` }}
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
              />
              <span className="text-[9px] text-muted-foreground truncate w-full text-center hidden sm:block">
                {formatLabel(item.date).split(" ")[1]}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">
            {formatLabel(sorted[0].date)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatLabel(sorted[sorted.length - 1].date)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── History item ──────────────────────────────────────────────────────────────

function MoodHistoryItem({
  entry,
  onDelete,
  isDeleting,
}: {
  entry: MoodEntry;
  onDelete: (id: bigint) => void;
  isDeleting: boolean;
}) {
  const d = new Date(`${entry.date}T00:00:00`);
  const label = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16 }}
      className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-smooth group"
      data-ocid="mood-history-item"
    >
      <span
        className="text-2xl leading-none flex-shrink-0"
        role="img"
        aria-label={`Score ${entry.score}`}
      >
        {entry.emoji}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-xs text-muted-foreground">
            Score {Number(entry.score)}/5
          </span>
        </div>
        {entry.note && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {entry.note}
          </p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-smooth h-7 w-7 flex-shrink-0"
        onClick={() => onDelete(entry.id)}
        disabled={isDeleting}
        aria-label="Delete mood entry"
        data-ocid="mood-delete-btn"
      >
        <Trash2 className="h-3.5 w-3.5 text-destructive" />
      </Button>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Mood() {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const { data: recentEntries = [], isLoading } = useMoodEntries(14);
  const logMood = useLogMood();
  const deleteMood = useDeleteMoodEntry();

  const last7Entries = useMemo(() => {
    const cutoff = nDaysAgo(6);
    return [...recentEntries]
      .filter((e) => e.date >= cutoff)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [recentEntries]);

  const alreadyLoggedToday = useMemo(
    () => recentEntries.some((e) => e.date === today()),
    [recentEntries],
  );

  const handleLog = () => {
    if (!selectedScore) return;
    const mood = MOODS.find((m) => m.score === selectedScore)!;
    logMood.mutate(
      {
        date: today(),
        emoji: mood.emoji,
        score: BigInt(mood.score),
        note: note.trim() || null,
      },
      {
        onSuccess: () => {
          setSelectedScore(null);
          setNote("");
        },
      },
    );
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl font-bold text-foreground">
          Mood Tracker
        </h1>
        <p className="text-muted-foreground mt-1">
          Check in with yourself daily — every feeling is valid.
        </p>
      </motion.div>

      {/* Check-in card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card className="shadow-soft border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {alreadyLoggedToday
                ? "You've checked in today ✨"
                : "How are you feeling right now?"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Emoji selector */}
            <div
              className="flex justify-between gap-2"
              aria-label="Select mood"
              data-ocid="mood-emoji-selector"
            >
              {MOODS.map((mood) => (
                <button
                  key={mood.score}
                  type="button"
                  aria-pressed={selectedScore === mood.score}
                  onClick={() =>
                    setSelectedScore(
                      selectedScore === mood.score ? null : mood.score,
                    )
                  }
                  className={`flex flex-col items-center gap-1.5 flex-1 py-3 px-1 rounded-xl transition-smooth hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedScore === mood.score ? "bg-primary/15 ring-2 ring-primary" : "bg-muted/40"}`}
                  data-ocid={`mood-option-${mood.score}`}
                >
                  <span
                    className="text-3xl sm:text-4xl leading-none"
                    role="img"
                    aria-label={mood.label}
                  >
                    {mood.emoji}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {mood.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground/70">
                    {mood.score}/5
                  </span>
                </button>
              ))}
            </div>

            {/* Note field */}
            <AnimatePresence>
              {selectedScore !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <Textarea
                    placeholder="Add a note about how you're feeling (optional)…"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="resize-none bg-muted/40 border-border text-sm"
                    rows={3}
                    data-ocid="mood-note-input"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              onClick={handleLog}
              disabled={!selectedScore || logMood.isPending}
              className="w-full"
              data-ocid="mood-log-btn"
            >
              {logMood.isPending ? "Saving…" : "Log Mood"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chart */}
      {!isLoading && recentEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <MoodChart entries={recentEntries} />
        </motion.div>
      )}

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="space-y-3"
      >
        <h2 className="font-semibold text-foreground">Past 7 Days</h2>

        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        ) : last7Entries.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 rounded-xl bg-muted/30 text-center"
            data-ocid="mood-empty-state"
          >
            <span className="text-4xl mb-3">🌱</span>
            <p className="text-sm font-medium text-foreground">
              No entries yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Log your first mood above to get started
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-2">
              {last7Entries.map((entry) => (
                <MoodHistoryItem
                  key={String(entry.id)}
                  entry={entry}
                  onDelete={deleteMood.mutate}
                  isDeleting={deleteMood.isPending}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}
