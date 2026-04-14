import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { Goal } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Plus,
  Target,
  Trash2,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Backend hook ─────────────────────────────────────────────────────────────
function useBackendActor() {
  return useActor(createActor);
}

function useGoals(status: string | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Goal[]>({
    queryKey: ["goals", status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGoals(status);
    },
    enabled: !!actor && !isFetching,
  });
}

function useCreateGoal() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      targetDate,
    }: {
      title: string;
      description: string;
      targetDate: string | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createGoal(title, description, targetDate);
      if (result.__kind__ === "err") throw new Error("Failed to create goal");
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal created! You've got this 💪");
    },
    onError: () => toast.error("Could not create goal. Please try again."),
  });
}

function useUpdateGoal() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      goalId,
      title,
      description,
      targetDate,
      status,
      progress,
    }: {
      goalId: bigint;
      title?: string | null;
      description?: string | null;
      targetDate?: string | null;
      status?: string | null;
      progress?: bigint | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.updateGoal(
        goalId,
        title ?? null,
        description ?? null,
        targetDate ?? null,
        status ?? null,
        progress ?? null,
      );
      if (result.__kind__ === "err") throw new Error("Failed to update goal");
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
    onError: () => toast.error("Could not update goal. Please try again."),
  });
}

function useDeleteGoal() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goalId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteGoal(goalId);
      if (result.__kind__ === "err") throw new Error("Failed to delete goal");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal removed.");
    },
    onError: () => toast.error("Could not delete goal. Please try again."),
  });
}

// ─── Progress milestone ───────────────────────────────────────────────────────
const MILESTONES: Record<number, { emoji: string; label: string }> = {
  25: { emoji: "🌱", label: "Quarter way there!" },
  50: { emoji: "🔥", label: "Halfway done!" },
  75: { emoji: "⚡", label: "Almost there!" },
  100: { emoji: "🎉", label: "Goal achieved!" },
};

function getMilestone(prev: number, next: number) {
  for (const [pct, data] of Object.entries(MILESTONES)) {
    const p = Number(pct);
    if (prev < p && next >= p) return data;
  }
  return null;
}

// ─── Add Goal Form ────────────────────────────────────────────────────────────
function AddGoalForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const createGoal = useCreateGoal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createGoal.mutate(
      {
        title: title.trim(),
        description: description.trim(),
        targetDate: targetDate || null,
      },
      { onSuccess: onClose },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-primary/30 bg-primary/5 shadow-soft">
        <CardContent className="pt-5 pb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="goal-title" className="text-sm font-medium">
                What do you want to achieve?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="goal-title"
                data-ocid="goal-title-input"
                placeholder="e.g. Run a 5k, Read 12 books this year…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
                className="bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="goal-desc" className="text-sm font-medium">
                Description{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="goal-desc"
                data-ocid="goal-desc-input"
                placeholder="Why is this goal important to you?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="bg-background resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="goal-date" className="text-sm font-medium">
                Target date{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="goal-date"
                data-ocid="goal-date-input"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
                data-ocid="goal-form-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={!title.trim() || createGoal.isPending}
                data-ocid="goal-form-save"
              >
                {createGoal.isPending ? "Saving…" : "Save goal"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ value }: { value: number }) {
  const clipped = Math.min(100, Math.max(0, value));
  const color =
    clipped >= 75
      ? "bg-accent"
      : clipped >= 50
        ? "bg-primary"
        : clipped >= 25
          ? "bg-primary/70"
          : "bg-primary/40";

  return (
    <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
      <motion.div
        className={`absolute inset-y-0 left-0 rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${clipped}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Goal Card ────────────────────────────────────────────────────────────────
function GoalCard({ goal }: { goal: Goal }) {
  const updateGoal = useUpdateGoal();
  const deleteGoal = useDeleteGoal();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [milestone, setMilestone] = useState<{
    emoji: string;
    label: string;
  } | null>(null);

  const progress = Number(goal.progress);
  const isActive = goal.status === "active";

  const handleProgressStep = () => {
    const step = 10;
    const newProgress = Math.min(100, progress + step);
    const hit = getMilestone(progress, newProgress);
    if (hit) {
      setMilestone(hit);
      setTimeout(() => setMilestone(null), 2500);
    }
    updateGoal.mutate({ goalId: goal.id, progress: BigInt(newProgress) });
  };

  const handleStatus = (newStatus: "completed" | "abandoned") => {
    if (newStatus === "completed") {
      const hit = getMilestone(progress, 100);
      if (hit) {
        setMilestone(hit);
        setTimeout(() => setMilestone(null), 2500);
      }
    }
    updateGoal.mutate({ goalId: goal.id, status: newStatus });
    toast.success(
      newStatus === "completed"
        ? "🎉 Goal marked complete!"
        : "Goal marked as abandoned.",
    );
  };

  const handleDelete = () => {
    if (confirmDelete) {
      deleteGoal.mutate(goal.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        className="relative overflow-hidden shadow-soft transition-smooth hover:shadow-elevated border-border"
        data-ocid={`goal-card-${goal.id}`}
      >
        {/* Left accent stripe */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
            goal.status === "completed"
              ? "bg-accent"
              : goal.status === "abandoned"
                ? "bg-muted-foreground/40"
                : "bg-primary"
          }`}
        />

        <CardContent className="pl-5 pt-4 pb-4">
          {/* Milestone toast */}
          <AnimatePresence>
            {milestone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -8 }}
                className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-primary-foreground text-xs font-medium shadow-elevated"
              >
                <span>{milestone.emoji}</span>
                <span>{milestone.label}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <h3 className="font-display font-semibold text-foreground text-base leading-tight truncate">
                  {goal.title}
                </h3>
                {goal.status === "completed" && (
                  <Badge
                    variant="secondary"
                    className="shrink-0 bg-accent/20 text-accent-foreground border-accent/30"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Done
                  </Badge>
                )}
                {goal.status === "abandoned" && (
                  <Badge
                    variant="outline"
                    className="shrink-0 text-muted-foreground"
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    Abandoned
                  </Badge>
                )}
              </div>
              {goal.description && (
                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                  {goal.description}
                </p>
              )}
            </div>

            {/* Delete button */}
            <Button
              variant={confirmDelete ? "destructive" : "ghost"}
              size="icon"
              className="shrink-0 h-7 w-7"
              onClick={handleDelete}
              aria-label={confirmDelete ? "Confirm delete" : "Delete goal"}
              data-ocid={`goal-delete-${goal.id}`}
            >
              {confirmDelete ? (
                <AlertTriangle className="h-3.5 w-3.5" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>

          {/* Target date */}
          {goal.targetDate && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>
                Target:{" "}
                {new Date(goal.targetDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          {/* Progress section — only for active goals */}
          {isActive && (
            <div className="space-y-2 mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Progress
                </span>
                <span className="font-medium text-foreground">{progress}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <ProgressBar value={progress} />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 shrink-0 rounded-full border-primary/40 text-primary hover:bg-primary/10"
                  onClick={handleProgressStep}
                  aria-label="Increase progress by 10%"
                  data-ocid={`goal-progress-inc-${goal.id}`}
                  disabled={progress >= 100 || updateGoal.isPending}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Milestone indicators */}
              <div className="flex gap-1.5 pt-0.5">
                {([25, 50, 75, 100] as const).map((pct) => (
                  <div
                    key={pct}
                    className={`flex items-center gap-1 text-xs rounded-full px-2 py-0.5 transition-smooth ${
                      progress >= pct
                        ? "bg-primary/15 text-primary font-medium"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span>{MILESTONES[pct].emoji}</span>
                    <span>{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed view */}
          {goal.status === "completed" && (
            <div className="mt-3 flex items-center gap-2 text-sm text-accent-foreground bg-accent/10 rounded-lg px-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Amazing work — you completed this goal! 🎊</span>
            </div>
          )}

          {/* Action buttons */}
          {isActive && (
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs border-accent/40 text-foreground hover:bg-accent/10"
                onClick={() => handleStatus("completed")}
                data-ocid={`goal-complete-${goal.id}`}
                disabled={updateGoal.isPending}
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-accent" />
                Mark complete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => handleStatus("abandoned")}
                data-ocid={`goal-abandon-${goal.id}`}
                disabled={updateGoal.isPending}
              >
                <XCircle className="w-3.5 h-3.5 mr-1.5" />
                Abandon
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Goal list with empty state ───────────────────────────────────────────────
function GoalList({
  status,
  emptyMessage,
  emptyIcon,
}: {
  status: string | null;
  emptyMessage: string;
  emptyIcon: React.ReactNode;
}) {
  const { data: goals, isLoading } = useGoals(status);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
        data-ocid="goals-empty-state"
      >
        <div className="text-4xl mb-3">{emptyIcon}</div>
        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
          {emptyMessage}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {goals.map((goal) => (
          <GoalCard key={String(goal.id)} goal={goal} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Goals() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
            <Target className="w-7 h-7 text-primary" />
            Goals
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Set intentions, track progress, celebrate wins.
          </p>
        </div>
        <Button
          onClick={() => setShowForm((v) => !v)}
          size="sm"
          data-ocid="add-goal-btn"
          className="shrink-0"
        >
          {showForm ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1.5" />
              Collapse
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-1.5" />
              New goal
            </>
          )}
        </Button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showForm && <AddGoalForm onClose={() => setShowForm(false)} />}
      </AnimatePresence>

      {/* Tabs */}
      <Tabs defaultValue="active" data-ocid="goals-tabs">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="active" data-ocid="tab-active">
            <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
            Active
          </TabsTrigger>
          <TabsTrigger value="completed" data-ocid="tab-completed">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            Completed
          </TabsTrigger>
          <TabsTrigger value="abandoned" data-ocid="tab-abandoned">
            <XCircle className="w-3.5 h-3.5 mr-1.5" />
            Abandoned
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <GoalList
            status="active"
            emptyMessage="What do you want to achieve? Set your first goal and start making it happen!"
            emptyIcon={
              <Target className="w-10 h-10 text-muted-foreground/50" />
            }
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <GoalList
            status="completed"
            emptyMessage="No completed goals yet — keep working toward your active ones!"
            emptyIcon="🏆"
          />
        </TabsContent>

        <TabsContent value="abandoned" className="mt-4">
          <GoalList
            status="abandoned"
            emptyMessage="No abandoned goals. Every goal you set is a step in the right direction."
            emptyIcon="💪"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
