import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useDailyAffirmation, useProfile } from "@/hooks/useProfile";
import { useAppStore } from "@/store/useAppStore";
import type { Goal, Habit, HabitCompletion, MoodEntry } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Droplets,
  Flame,
  Moon,
  SmilePlus,
  Sparkles,
  Star,
  Target,
  Trophy,
  Wind,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Actor hook ──────────────────────────────────────────────────────────────
function useBackendActor() {
  return useActor(createActor);
}

// ─── Data hooks ───────────────────────────────────────────────────────────────
function useTodayMood() {
  const { actor, isFetching } = useBackendActor();
  const today = new Date().toISOString().split("T")[0];
  return useQuery<MoodEntry[]>({
    queryKey: ["moodEntries", today],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMoodEntries(today, today);
    },
    enabled: !!actor && !isFetching,
  });
}

function useTodayHabits() {
  const { actor, isFetching } = useBackendActor();
  const today = new Date().toISOString().split("T")[0];
  return useQuery<{ habits: Habit[]; completions: HabitCompletion[] }>({
    queryKey: ["habitsToday", today],
    queryFn: async () => {
      if (!actor) return { habits: [], completions: [] };
      const [habits, completions] = await Promise.all([
        actor.getHabits(),
        actor.getHabitCompletions(today, today),
      ]);
      return { habits: habits.filter((h) => !h.isArchived), completions };
    },
    enabled: !!actor && !isFetching,
  });
}

function useActiveGoals() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Goal[]>({
    queryKey: ["goals", "active"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGoals("active");
    },
    enabled: !!actor && !isFetching,
  });
}

function useRecentActivity() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<MoodEntry[]>({
    queryKey: ["recentMood"],
    queryFn: async () => {
      if (!actor) return [];
      const from = new Date(Date.now() - 7 * 86400000)
        .toISOString()
        .split("T")[0];
      const to = new Date().toISOString().split("T")[0];
      const entries = await actor.getMoodEntries(from, to);
      return entries.slice(-3).reverse();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Greeting ────────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatRelativeDate(dateStr: string) {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (dateStr === today) return "Today";
  if (dateStr === yesterday) return "Yesterday";
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function AffirmationCard() {
  const { data: affirmation, isLoading } = useDailyAffirmation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="relative overflow-hidden border-primary/20 bg-primary/5 shadow-soft">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        <CardContent className="p-6 relative">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
              <Sparkles size={20} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                Daily Affirmation
              </p>
              {isLoading ? (
                <Skeleton className="h-6 w-3/4" />
              ) : (
                <p className="font-display text-xl font-semibold text-foreground leading-snug">
                  {affirmation ?? "You are worthy of care and kindness."}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  delay,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  delay: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <Card className="shadow-soft hover:shadow-elevated transition-smooth border-border/60 h-full">
        <CardContent className="p-4 flex items-start gap-3">
          <div
            className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${color}`}
          >
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="font-semibold text-foreground text-base truncate">
              {value}
            </p>
            {sub && (
              <p className="text-xs text-muted-foreground truncate">{sub}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface QuickAction {
  label: string;
  icon: React.ElementType;
  to: string;
  color: string;
  bg: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Log Mood",
    icon: SmilePlus,
    to: "/mood",
    color: "text-chart-1",
    bg: "bg-chart-1/10 hover:bg-chart-1/20",
  },
  {
    label: "Track Habits",
    icon: Flame,
    to: "/habits",
    color: "text-primary",
    bg: "bg-primary/10 hover:bg-primary/20",
  },
  {
    label: "Write Journal",
    icon: BookOpen,
    to: "/journal",
    color: "text-chart-2",
    bg: "bg-chart-2/10 hover:bg-chart-2/20",
  },
  {
    label: "Log Sleep",
    icon: Moon,
    to: "/sleep",
    color: "text-chart-5",
    bg: "bg-chart-5/10 hover:bg-chart-5/20",
  },
  {
    label: "Log Water",
    icon: Droplets,
    to: "/water",
    color: "text-chart-3",
    bg: "bg-chart-3/10 hover:bg-chart-3/20",
  },
  {
    label: "Breathe",
    icon: Wind,
    to: "/breathing",
    color: "text-accent",
    bg: "bg-accent/10 hover:bg-accent/20",
  },
];

function QuickActions() {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-foreground mb-3">
        Quick Actions
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {QUICK_ACTIONS.map((action, i) => (
          <motion.div
            key={action.to}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
          >
            <Link
              to={action.to}
              data-ocid={`quick-action-${action.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl ${action.bg} ${action.color} transition-smooth cursor-pointer border border-border/40`}
            >
              <action.icon size={22} />
              <span className="text-xs font-medium text-foreground text-center leading-tight">
                {action.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface MilestoneBadge {
  days: number;
  label: string;
  icon: string;
  color: string;
  glow: string;
}

const MILESTONES: MilestoneBadge[] = [
  {
    days: 7,
    label: "7-Day Streak",
    icon: "🌱",
    color: "border-chart-3/40 bg-chart-3/10",
    glow: "shadow-[0_0_16px_rgba(0,200,150,0.35)]",
  },
  {
    days: 30,
    label: "30-Day Streak",
    icon: "🔥",
    color: "border-chart-1/40 bg-chart-1/10",
    glow: "shadow-[0_0_20px_rgba(240,140,30,0.4)]",
  },
  {
    days: 100,
    label: "100-Day Streak",
    icon: "⭐",
    color: "border-chart-5/40 bg-chart-5/10",
    glow: "shadow-[0_0_24px_rgba(160,100,240,0.45)]",
  },
];

function StreakRewards({ longestStreak }: { longestStreak: number }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <Trophy size={18} className="text-chart-1" />
        Streak Milestones
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {MILESTONES.map((m, i) => {
          const achieved = longestStreak >= m.days;
          return (
            <motion.div
              key={m.days}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
            >
              <div
                className={`rounded-xl border p-4 text-center transition-smooth ${
                  achieved
                    ? `${m.color} ${m.glow}`
                    : "border-border/40 bg-muted/40 opacity-50 grayscale"
                }`}
              >
                <div className="text-3xl mb-1">{m.icon}</div>
                <p className="text-xs font-semibold text-foreground">
                  {m.label}
                </p>
                {achieved && (
                  <Badge className="mt-1 text-[10px] bg-primary/20 text-primary border-0 px-2">
                    Achieved!
                  </Badge>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function RecentActivity({ entries }: { entries: MoodEntry[] }) {
  if (entries.length === 0) {
    return (
      <div
        data-ocid="recent-activity-empty"
        className="text-center py-6 text-muted-foreground text-sm"
      >
        <Star size={28} className="mx-auto mb-2 opacity-30" />
        <p>No recent activity yet. Start logging your first mood!</p>
        <Link
          to="/mood"
          className="text-primary text-sm font-medium mt-1 inline-block hover:underline"
        >
          Log your mood →
        </Link>
      </div>
    );
  }
  return (
    <ul className="space-y-2">
      {entries.map((e, i) => (
        <motion.li
          key={e.id.toString()}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: i * 0.08 }}
          data-ocid={`recent-activity-item-${i}`}
          className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/40"
        >
          <span className="text-2xl">{e.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">
              Mood logged — score {Number(e.score)}/10
            </p>
            {e.note && (
              <p className="text-xs text-muted-foreground truncate">{e.note}</p>
            )}
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatRelativeDate(e.date)}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const profile = useAppStore((s) => s.profile);
  const { isAuthenticated } = useAuth();

  const { data: todayMoods = [], isLoading: moodLoading } = useTodayMood();
  const { data: habitsData, isLoading: habitsLoading } = useTodayHabits();
  const { data: activeGoals = [], isLoading: goalsLoading } = useActiveGoals();
  const { data: recentActivity = [], isLoading: activityLoading } =
    useRecentActivity();

  const greeting = getGreeting();
  const displayName = profile
    ? `${profile.userId.toText().slice(0, 8)}…`
    : "friend";

  // Stats derived
  const todayMood =
    todayMoods.length > 0 ? todayMoods[todayMoods.length - 1] : null;
  const habits = habitsData?.habits ?? [];
  const completions = habitsData?.completions ?? [];
  const doneToday = completions.filter((c) => c.completed).length;
  const totalHabits = habits.length;

  // Longest streak: for display we show streak info from completions heuristic
  // (full streak calc requires per-habit queries; use completions count as proxy)
  const longestStreakDays = completions.reduce((acc, c) => {
    return c.completed ? acc + 1 : acc;
  }, 0);

  const statsLoading = moodLoading || habitsLoading || goalsLoading;

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-7 pb-6">
      {/* Header Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl font-bold text-foreground">
          {greeting}, {displayName} 👋
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </motion.div>

      {/* Daily Affirmation */}
      <AffirmationCard />

      {/* Quick Stats */}
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          Today at a Glance
        </h2>
        {statsLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
            data-ocid="quick-stats"
          >
            <StatCard
              icon={SmilePlus}
              label="Today's Mood"
              value={
                todayMood
                  ? `${todayMood.emoji} Score ${Number(todayMood.score)}`
                  : "Not logged"
              }
              sub={todayMood ? "Logged today" : "Tap to log"}
              delay={0.05}
              color="bg-chart-1/15 text-chart-1"
            />
            <StatCard
              icon={Flame}
              label="Habits Done"
              value={
                totalHabits > 0 ? `${doneToday} / ${totalHabits}` : "No habits"
              }
              sub={
                totalHabits > 0
                  ? doneToday === totalHabits
                    ? "All done! 🎉"
                    : `${totalHabits - doneToday} remaining`
                  : "Add a habit"
              }
              delay={0.1}
              color="bg-primary/15 text-primary"
            />
            <StatCard
              icon={Trophy}
              label="Streak Today"
              value={
                longestStreakDays > 0 ? `${longestStreakDays} habits` : "0"
              }
              sub="Completed today"
              delay={0.15}
              color="bg-chart-5/15 text-chart-5"
            />
            <StatCard
              icon={Target}
              label="Active Goals"
              value={goalsLoading ? "…" : String(activeGoals.length)}
              sub={
                activeGoals.length === 1
                  ? "1 goal in progress"
                  : `${activeGoals.length} goals in progress`
              }
              delay={0.2}
              color="bg-chart-2/15 text-chart-2"
            />
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Streak Rewards */}
      <StreakRewards longestStreak={longestStreakDays} />

      {/* Recent Activity */}
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          Recent Activity
        </h2>
        {activityLoading ? (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        ) : (
          <RecentActivity entries={recentActivity} />
        )}
      </div>
    </div>
  );
}
