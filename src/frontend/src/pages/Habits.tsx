import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { Habit, HabitCompletion, HabitStreak } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Archive, Flame, MoreVertical, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function nDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

function useBackendActor() {
  return useActor(createActor);
}

// ─── Query hooks ───────────────────────────────────────────────────────────────

function useHabits() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Habit[]>({
    queryKey: ["habits"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHabits();
    },
    enabled: !!actor && !isFetching,
  });
}

function useWeekCompletions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<HabitCompletion[]>({
    queryKey: ["habitCompletions", "week"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHabitCompletions(nDaysAgo(6), today());
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

function useHabitStreak(habitId: bigint, enabled: boolean) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<HabitStreak>({
    queryKey: ["habitStreak", habitId.toString()],
    queryFn: async () => {
      if (!actor) return { habitId, currentStreak: 0n, longestStreak: 0n };
      return actor.getHabitStreak(habitId, today());
    },
    enabled: !!actor && !isFetching && enabled,
    staleTime: 1000 * 60,
  });
}

function useCreateHabit() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      color,
      icon,
    }: {
      name: string;
      color: string;
      icon: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createHabit(name, color, icon);
      if (result.__kind__ === "err") throw new Error("Failed to create habit");
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      toast.success("Habit created! 🎯");
    },
    onError: () => toast.error("Could not create habit."),
  });
}

function useArchiveHabit() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.archiveHabit(id);
      if (result.__kind__ === "err") throw new Error("Archive failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      toast.success("Habit archived");
    },
    onError: () => toast.error("Could not archive habit."),
  });
}

function useDeleteHabit() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteHabit(id);
      if (result.__kind__ === "err") throw new Error("Delete failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      qc.invalidateQueries({ queryKey: ["habitCompletions"] });
      toast.success("Habit deleted");
    },
    onError: () => toast.error("Could not delete habit."),
  });
}

function useSetHabitCompletion() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      habitId,
      date,
      completed,
    }: {
      habitId: bigint;
      date: string;
      completed: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.setHabitCompletion(habitId, date, completed);
      if (result.__kind__ === "err") throw new Error("Toggle failed");
      return result.ok;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["habitCompletions"] });
      qc.invalidateQueries({
        queryKey: ["habitStreak", vars.habitId.toString()],
      });
    },
    onError: () => toast.error("Could not update habit."),
  });
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const PRESET_COLORS = [
  "#7C6AF7",
  "#4EAAD1",
  "#E07B54",
  "#5DBB8A",
  "#D45E91",
  "#F4B942",
  "#A78BFA",
  "#60C7B5",
];

const PRESET_ICONS = [
  "🏃",
  "💧",
  "📖",
  "🧘",
  "🥗",
  "💤",
  "🎯",
  "🎸",
  "✍️",
  "🌿",
  "🏋️",
  "🧹",
  "💊",
  "🌞",
  "🤝",
  "🎨",
];

const MILESTONE_STREAKS = [7, 30, 100];

// ─── Add Habit Dialog ──────────────────────────────────────────────────────────

function AddHabitDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [icon, setIcon] = useState(PRESET_ICONS[0]);
  const createHabit = useCreateHabit();

  const handleSubmit = () => {
    if (!name.trim()) return;
    createHabit.mutate(
      { name: name.trim(), color, icon },
      {
        onSuccess: () => {
          setName("");
          setColor(PRESET_COLORS[0]);
          setIcon(PRESET_ICONS[0]);
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="add-habit-dialog">
        <DialogHeader>
          <DialogTitle>Create a new habit</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="habit-name">Habit name</Label>
            <Input
              id="habit-name"
              placeholder="e.g. Morning walk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              data-ocid="habit-name-input"
            />
          </div>

          {/* Icon picker */}
          <div className="space-y-1.5">
            <Label>Icon</Label>
            <div className="grid grid-cols-8 gap-1.5">
              {PRESET_ICONS.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={[
                    "text-xl p-1.5 rounded-lg transition-smooth hover:bg-muted",
                    icon === ic
                      ? "bg-primary/15 ring-2 ring-primary"
                      : "bg-muted/40",
                  ].join(" ")}
                  aria-label={`Icon ${ic}`}
                  data-ocid={`habit-icon-${ic}`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Color picker */}
          <div className="space-y-1.5">
            <Label>Color</Label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={[
                    "h-8 w-8 rounded-full transition-smooth hover:scale-110",
                    color === c ? "ring-2 ring-offset-2 ring-foreground" : "",
                  ].join(" ")}
                  style={{ backgroundColor: c }}
                  aria-label={`Color ${c}`}
                  data-ocid={`habit-color-${c}`}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
              style={{ backgroundColor: `${color}25` }}
            >
              {icon}
            </div>
            <span className="font-medium text-foreground truncate">
              {name || "Your habit name"}
            </span>
            <div
              className="h-3 w-3 rounded-full ml-auto flex-shrink-0"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="add-habit-cancel"
          >
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || createHabit.isPending}
            data-ocid="add-habit-submit"
          >
            {createHabit.isPending ? "Creating…" : "Create Habit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Habit row ─────────────────────────────────────────────────────────────────

function HabitRow({
  habit,
  completions,
  onToggle,
  isToggling,
}: {
  habit: Habit;
  completions: HabitCompletion[];
  onToggle: (habitId: bigint, completed: boolean) => void;
  isToggling: boolean;
}) {
  const archive = useArchiveHabit();
  const del = useDeleteHabit();
  const { data: streak } = useHabitStreak(habit.id, true);

  const currentStreak = Number(streak?.currentStreak ?? 0n);

  const todayCompletion = useMemo(
    () =>
      completions.find((c) => c.habitId === habit.id && c.date === today())
        ?.completed ?? false,
    [completions, habit.id],
  );

  // Week progress (past 7 days including today)
  const weekRate = useMemo(() => {
    const past7 = completions.filter((c) => c.habitId === habit.id);
    const completed = past7.filter((c) => c.completed).length;
    return past7.length > 0 ? Math.round((completed / 7) * 100) : 0;
  }, [completions, habit.id]);

  // Streak milestone glow
  const isMilestone = MILESTONE_STREAKS.includes(currentStreak);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={[
        "flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border transition-smooth",
        isMilestone ? "ring-2 ring-primary/50 shadow-elevated" : "shadow-soft",
      ].join(" ")}
      data-ocid="habit-row"
    >
      {/* Icon */}
      <div
        className="h-10 w-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: `${habit.color}20` }}
      >
        {habit.icon}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-medium text-foreground truncate">
            {habit.name}
          </span>
          {/* Color dot */}
          <div
            className="h-2 w-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: habit.color }}
          />
          {/* Streak badge */}
          {currentStreak > 0 && (
            <Badge
              variant="secondary"
              className={[
                "text-xs flex items-center gap-0.5 flex-shrink-0",
                isMilestone ? "bg-primary/15 text-primary" : "",
              ].join(" ")}
              data-ocid="habit-streak-badge"
            >
              <Flame className="h-3 w-3" />
              {currentStreak}d{isMilestone && " 🎉"}
            </Badge>
          )}
        </div>

        {/* Week progress bar */}
        <div className="flex items-center gap-2">
          <Progress
            value={weekRate}
            className="h-1.5 flex-1"
            data-ocid="habit-progress-bar"
          />
          <span className="text-[10px] text-muted-foreground flex-shrink-0">
            {weekRate}% this week
          </span>
        </div>
      </div>

      {/* Check button */}
      <button
        type="button"
        onClick={() => onToggle(habit.id, !todayCompletion)}
        disabled={isToggling}
        aria-label={todayCompletion ? "Mark incomplete" : "Mark complete"}
        className={[
          "h-9 w-9 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
          "transition-smooth hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          todayCompletion
            ? "border-transparent text-white"
            : "border-border bg-muted/40 text-muted-foreground",
        ].join(" ")}
        style={todayCompletion ? { backgroundColor: habit.color } : {}}
        data-ocid="habit-toggle-btn"
      >
        {todayCompletion ? "✓" : ""}
      </button>

      {/* 3-dot menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 flex-shrink-0"
            aria-label="Habit options"
            data-ocid="habit-menu-trigger"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => archive.mutate(habit.id)}
            disabled={archive.isPending}
            data-ocid="habit-archive-btn"
          >
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => del.mutate(habit.id)}
            disabled={del.isPending}
            className="text-destructive focus:text-destructive"
            data-ocid="habit-delete-btn"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Habits() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: habits = [], isLoading: habitsLoading } = useHabits();
  const { data: completions = [], isLoading: completionsLoading } =
    useWeekCompletions();
  const toggleCompletion = useSetHabitCompletion();

  const activeHabits = useMemo(
    () => habits.filter((h) => !h.isArchived),
    [habits],
  );

  const isLoading = habitsLoading || completionsLoading;

  const handleToggle = useCallback(
    (habitId: bigint, completed: boolean) => {
      toggleCompletion.mutate({ habitId, date: today(), completed });
    },
    [toggleCompletion],
  );

  const completedToday = useMemo(() => {
    const todayStr = today();
    return completions.filter((c) => c.date === todayStr && c.completed).length;
  }, [completions]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Habit Tracker
          </h1>
          <p className="text-muted-foreground mt-1">
            Small steps, big changes — track your daily commitments.
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="flex-shrink-0"
          data-ocid="add-habit-trigger"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Habit
        </Button>
      </motion.div>

      {/* Daily summary */}
      {!isLoading && activeHabits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="shadow-soft bg-primary/5 border-primary/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Today's progress
                </span>
                <span className="text-sm font-bold text-primary">
                  {completedToday} / {activeHabits.length}
                </span>
              </div>
              <Progress
                value={
                  activeHabits.length > 0
                    ? (completedToday / activeHabits.length) * 100
                    : 0
                }
                className="h-2"
                data-ocid="daily-progress-bar"
              />
              {completedToday === activeHabits.length &&
                activeHabits.length > 0 && (
                  <p className="text-xs text-primary font-medium mt-2 text-center">
                    🎉 All habits completed today! Amazing work!
                  </p>
                )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Habits list */}
      <div className="space-y-3">
        <h2 className="font-semibold text-foreground">Today's Habits</h2>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : activeHabits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 rounded-xl bg-muted/30 text-center"
            data-ocid="habits-empty-state"
          >
            <span className="text-5xl mb-4">🌱</span>
            <p className="text-sm font-medium text-foreground">No habits yet</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Start building your daily routines
            </p>
            <Button
              size="sm"
              onClick={() => setDialogOpen(true)}
              data-ocid="habits-empty-cta"
            >
              <Plus className="h-4 w-4 mr-1" />
              Create your first habit
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence>
            {activeHabits.map((habit, i) => (
              <motion.div
                key={String(habit.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <HabitRow
                  habit={habit}
                  completions={completions}
                  onToggle={handleToggle}
                  isToggling={toggleCompletion.isPending}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Add habit dialog */}
      <AddHabitDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
