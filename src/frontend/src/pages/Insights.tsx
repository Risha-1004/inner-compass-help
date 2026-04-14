import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Habit, HabitCompletion, HabitStreak, MoodEntry } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Award, BarChart2, Flame, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Date helpers ─────────────────────────────────────────────────────────────
function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

// ─── Mood Trend Chart ─────────────────────────────────────────────────────────
function MoodTrendChart({ entries }: { entries: MoodEntry[] }) {
  const data = useMemo(() => {
    const byDate = new Map<string, number>();
    for (const e of entries) {
      byDate.set(e.date, Number(e.score));
    }
    return Array.from({ length: 30 }, (_, i) => {
      const d = daysAgo(29 - i);
      const dateStr = toDateStr(d);
      const label = d.toLocaleDateString("en", {
        month: "short",
        day: "numeric",
      });
      return { date: label, score: byDate.get(dateStr) ?? null };
    });
  }, [entries]);

  if (entries.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground text-sm">
        No mood entries in the last 30 days
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="oklch(var(--primary))"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="oklch(var(--primary))"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
          tickLine={false}
          interval={6}
        />
        <YAxis
          domain={[1, 5]}
          ticks={[1, 2, 3, 4, 5]}
          tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border))",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: "oklch(var(--foreground))" }}
          formatter={(v) => (v != null ? [v, "Mood score"] : ["No entry", ""])}
        />
        <Area
          type="monotone"
          dataKey="score"
          stroke="oklch(var(--primary))"
          strokeWidth={2}
          fill="url(#moodGrad)"
          connectNulls={false}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Mood Distribution ────────────────────────────────────────────────────────
const MOOD_LABELS: Record<number, string> = {
  1: "😞 Very Low",
  2: "😔 Low",
  3: "😐 Okay",
  4: "🙂 Good",
  5: "😄 Great",
};
const MOOD_COLORS = [
  "oklch(0.6 0.15 25)",
  "oklch(0.65 0.12 45)",
  "oklch(0.7 0.1 90)",
  "oklch(0.65 0.15 145)",
  "oklch(0.62 0.18 270)",
];

function MoodDistribution({ entries }: { entries: MoodEntry[] }) {
  const data = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    for (const e of entries) {
      const s = Number(e.score);
      if (s >= 1 && s <= 5) counts[s - 1]++;
    }
    return counts.map((count, i) => ({
      label: MOOD_LABELS[i + 1],
      count,
      score: i + 1,
    }));
  }, [entries]);

  if (entries.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground text-sm">
        No mood data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border))",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={(v: number) => [v, "Days"]}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((d) => (
            <Cell key={d.score} fill={MOOD_COLORS[d.score - 1]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Habit Heatmap ────────────────────────────────────────────────────────────
function HeatmapCell({ rate }: { rate: number | null }) {
  const bg =
    rate === null
      ? "bg-muted/40"
      : rate === 0
        ? "bg-muted/60"
        : rate < 0.5
          ? "bg-primary/25"
          : rate < 1
            ? "bg-primary/55"
            : "bg-primary";
  return (
    <div
      className={`h-4 w-4 rounded-sm ${bg} transition-smooth`}
      title={rate !== null ? `${Math.round(rate * 100)}% completed` : "No data"}
    />
  );
}

function HabitHeatmap({
  completions,
  habits,
}: { completions: HabitCompletion[]; habits: Habit[] }) {
  const cells = useMemo(() => {
    const activeHabitIds = new Set(
      habits.filter((h) => !h.isArchived).map((h) => h.id),
    );
    const habitCount = activeHabitIds.size;

    return Array.from({ length: 56 }, (_, i) => {
      const d = daysAgo(55 - i);
      const dateStr = toDateStr(d);
      if (habitCount === 0) return { date: dateStr, rate: null };
      const dayCompletions = completions.filter(
        (c) => c.date === dateStr && activeHabitIds.has(c.habitId),
      );
      const completed = dayCompletions.filter((c) => c.completed).length;
      return { date: dateStr, rate: completed / habitCount };
    });
  }, [completions, habits]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => (
          <div key={d} className="text-center text-xs text-muted-foreground">
            {d.charAt(0)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell) => (
          <HeatmapCell key={cell.date} rate={cell.rate} />
        ))}
      </div>
      <div className="flex items-center gap-2 pt-1">
        <span className="text-xs text-muted-foreground">Less</span>
        {(["none", "zero", "low", "mid", "full"] as const).map((label, i) => {
          const r = [null, 0, 0.25, 0.6, 1][i] as number | null;
          return <HeatmapCell key={label} rate={r} />;
        })}
        <span className="text-xs text-muted-foreground">More</span>
      </div>
    </div>
  );
}

// ─── Streak leaderboard ───────────────────────────────────────────────────────
function StreakLeaderboard({
  habits,
  streaks,
}: { habits: Habit[]; streaks: HabitStreak[] }) {
  const ranked = useMemo(() => {
    return habits
      .filter((h) => !h.isArchived)
      .map((h) => {
        const streak = streaks.find((s) => s.habitId === h.id);
        return {
          habit: h,
          current: Number(streak?.currentStreak ?? 0),
          longest: Number(streak?.longestStreak ?? 0),
        };
      })
      .sort((a, b) => b.current - a.current);
  }, [habits, streaks]);

  if (ranked.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        No habits yet. Start one to see your streaks!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {ranked.map(({ habit, current, longest }, idx) => (
        <li
          key={String(habit.id)}
          className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2.5"
        >
          <span className="w-5 text-sm font-bold text-muted-foreground">
            {idx + 1}
          </span>
          <span className="text-lg">{habit.icon}</span>
          <span className="flex-1 text-sm font-medium text-foreground min-w-0 truncate">
            {habit.name}
          </span>
          <div className="flex items-center gap-1 text-sm font-semibold text-primary">
            <Flame className="h-4 w-4" />
            {current}d
          </div>
          {longest > current && (
            <span className="text-xs text-muted-foreground">
              best: {longest}d
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

// ─── Weekly summary ───────────────────────────────────────────────────────────
function WeeklySummary({
  moodEntries,
  completions,
  habits,
}: {
  moodEntries: MoodEntry[];
  completions: HabitCompletion[];
  habits: Habit[];
}) {
  const summary = useMemo(() => {
    const weekAgo = toDateStr(daysAgo(7));
    const today = toDateStr(new Date());

    const moodCount = moodEntries.filter(
      (e) => e.date >= weekAgo && e.date <= today,
    ).length;

    const activeHabits = habits.filter((h) => !h.isArchived);
    const possibleCompletions = activeHabits.length * 7;
    const weekCompletions = completions.filter(
      (c) => c.date >= weekAgo && c.date <= today && c.completed,
    ).length;
    const habitPct =
      possibleCompletions > 0
        ? Math.round((weekCompletions / possibleCompletions) * 100)
        : 0;

    const encouragements = [
      "You're showing up for yourself, and that matters. 🌱",
      "Every small step adds up. Keep going! 💫",
      "You're doing great — consistency is the key. ✨",
      "Progress over perfection. You've got this! 🌟",
    ];
    const msg =
      encouragements[Math.floor(Math.random() * encouragements.length)];

    return { moodCount, habitPct, msg };
  }, [moodEntries, completions, habits]);

  return (
    <div className="rounded-xl bg-primary/8 border border-primary/20 px-5 py-4 space-y-1">
      <p className="text-sm font-medium text-foreground">
        This week you logged moods <strong>{summary.moodCount}</strong> time
        {summary.moodCount !== 1 ? "s" : ""} and completed{" "}
        <strong>{summary.habitPct}%</strong> of your habits.
      </p>
      <p className="text-sm text-muted-foreground">{summary.msg}</p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Insights() {
  const { actor, isFetching } = useActor(createActor);
  const today = toDateStr(new Date());
  const from30 = toDateStr(daysAgo(60));

  const { data: moodEntries = [], isLoading: moodLoading } = useQuery<
    MoodEntry[]
  >({
    queryKey: ["moodEntries", from30, today],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMoodEntries(from30, today);
    },
    enabled: !!actor && !isFetching,
  });

  const { data: habits = [], isLoading: habitsLoading } = useQuery<Habit[]>({
    queryKey: ["habits"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHabits();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: completions = [], isLoading: completionsLoading } = useQuery<
    HabitCompletion[]
  >({
    queryKey: ["habitCompletions", from30, today],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHabitCompletions(from30, today);
    },
    enabled: !!actor && !isFetching,
  });

  // Fetch streaks for all active habits
  const { data: streaks = [], isLoading: streaksLoading } = useQuery<
    HabitStreak[]
  >({
    queryKey: [
      "habitStreaks",
      habits.map((h) => String(h.id)).join(","),
      today,
    ],
    queryFn: async () => {
      if (!actor || habits.length === 0) return [];
      const active = habits.filter((h) => !h.isArchived);
      return Promise.all(active.map((h) => actor.getHabitStreak(h.id, today)));
    },
    enabled: !!actor && !isFetching && habits.length > 0,
  });

  const bestStreak = useMemo(() => {
    if (streaks.length === 0) return null;
    const best = streaks.reduce(
      (max, s) => (s.longestStreak > max.longestStreak ? s : max),
      streaks[0],
    );
    const habit = habits.find((h) => h.id === best.habitId);
    return { habit, streak: Number(best.longestStreak) };
  }, [streaks, habits]);

  const isLoading =
    moodLoading || habitsLoading || completionsLoading || streaksLoading;

  if (isLoading) {
    return (
      <div className="space-y-4 p-2">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-56 rounded-xl" />
          <Skeleton className="h-56 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10" data-ocid="insights-page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">
            Insights
          </h1>
        </div>
        <p className="text-muted-foreground">
          A warm look at your mood and habit trends over time.
        </p>
      </motion.div>

      {/* Weekly summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <WeeklySummary
          moodEntries={moodEntries}
          completions={completions}
          habits={habits}
        />
      </motion.div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mood trend */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-soft h-full">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Mood Trend (30 days)
              </CardTitle>
            </CardHeader>
            <CardContent data-ocid="mood-trend-chart">
              <MoodTrendChart entries={moodEntries} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Mood distribution */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="shadow-soft h-full">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-primary" />
                Mood Distribution
              </CardTitle>
            </CardHeader>
            <CardContent data-ocid="mood-distribution-chart">
              <MoodDistribution entries={moodEntries} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Habit heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-soft h-full">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base">
                Habit Completion (8 weeks)
              </CardTitle>
            </CardHeader>
            <CardContent data-ocid="habit-heatmap">
              {habits.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No habits to display yet
                </p>
              ) : (
                <HabitHeatmap completions={completions} habits={habits} />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Streak leaderboard + best */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-4"
        >
          {/* Best streak highlight */}
          {bestStreak && bestStreak.streak > 0 && (
            <Card
              className="shadow-soft border-primary/30 bg-primary/5"
              data-ocid="best-streak"
            >
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                      All-Time Best Streak
                    </p>
                    <p className="text-xl font-bold text-foreground font-display">
                      {bestStreak.streak} days
                      {bestStreak.habit && (
                        <span className="ml-2 text-base font-normal text-muted-foreground">
                          {bestStreak.habit.icon} {bestStreak.habit.name}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Leaderboard */}
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Flame className="h-4 w-4 text-primary" />
                Streak Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent data-ocid="streak-leaderboard">
              <StreakLeaderboard habits={habits} streaks={streaks} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
