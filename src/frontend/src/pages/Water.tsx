import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { DailyWaterLog, WaterIntakeEntry } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Droplets, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function useBackendActor() {
  return useActor(createActor);
}

function useDailyWaterLog() {
  const { actor, isFetching } = useBackendActor();
  const today = format(new Date(), "yyyy-MM-dd");
  return useQuery<DailyWaterLog>({
    queryKey: ["dailyWater", today],
    queryFn: async () => {
      if (!actor)
        return { date: today, totalMl: 0n, goalMl: 2000n, entries: [] };
      return actor.getDailyWaterLog(today);
    },
    enabled: !!actor && !isFetching,
  });
}

function useAddWater() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");
  return useMutation({
    mutationFn: async (amountMl: number) => {
      if (!actor) throw new Error("Actor not available");
      const r = await actor.addWaterIntake(today, BigInt(amountMl));
      if (r.__kind__ === "err") throw new Error("Failed to add water");
      return r.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dailyWater"] });
    },
    onError: () => toast.error("Failed to log water"),
  });
}

function useDeleteWater() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      await actor.deleteWaterEntry(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dailyWater"] });
      toast.success("Entry removed");
    },
    onError: () => toast.error("Failed to remove entry"),
  });
}

function useSetWaterGoal() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (goalMl: number) => {
      if (!actor) throw new Error("Actor not available");
      await actor.setWaterGoal(BigInt(goalMl));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dailyWater"] });
      toast.success("Goal updated!");
    },
    onError: () => toast.error("Failed to update goal"),
  });
}

function ProgressRing({
  percent,
  totalMl,
  goalMl,
}: {
  percent: number;
  totalMl: number;
  goalMl: number;
}) {
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const filled = Math.min(percent / 100, 1) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative inline-flex items-center justify-center">
        <svg width={180} height={180} className="-rotate-90" aria-hidden="true">
          <circle
            cx={90}
            cy={90}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={12}
            className="text-muted/40"
          />
          <circle
            cx={90}
            cy={90}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={12}
            strokeDasharray={`${filled} ${circumference - filled}`}
            strokeLinecap="round"
            className="text-primary transition-smooth"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <Droplets className="h-7 w-7 text-primary mb-1" />
          <span className="font-display text-2xl font-bold text-foreground">
            {totalMl}
          </span>
          <span className="text-xs text-muted-foreground">/ {goalMl} ml</span>
        </div>
      </div>
      <div className="text-sm text-muted-foreground font-medium">
        {percent >= 100
          ? "🎉 Daily goal reached!"
          : percent >= 75
            ? "💧 Almost there, keep going!"
            : percent >= 50
              ? "💦 Halfway through your goal!"
              : "Start sipping — every drop counts!"}
      </div>
    </div>
  );
}

function SetGoalDialog({
  open,
  current,
  onClose,
}: {
  open: boolean;
  current: number;
  onClose: () => void;
}) {
  const [val, setVal] = useState(String(current));
  const setGoal = useSetWaterGoal();

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Set daily water goal</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const n = Number.parseInt(val);
            if (n > 0) {
              setGoal.mutate(n, { onSuccess: onClose });
            }
          }}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Label htmlFor="water-goal">Goal (ml)</Label>
            <Input
              id="water-goal"
              type="number"
              min={500}
              max={5000}
              step={100}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={setGoal.isPending}
              data-ocid="water-goal-submit"
            >
              Save
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EntryRow({
  entry,
  onDelete,
}: { entry: WaterIntakeEntry; onDelete: () => void }) {
  const time = new Date(Number(entry.loggedAt) / 1_000_000);
  return (
    <div
      className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
      data-ocid={`water-entry-${entry.id}`}
    >
      <div className="flex items-center gap-3">
        <Droplets className="h-4 w-4 text-primary" />
        <div>
          <span className="font-semibold text-foreground">
            {String(entry.amountMl)} ml
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            {Number.isNaN(time.getTime()) ? "" : format(time, "HH:mm")}
          </span>
        </div>
      </div>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label="Remove entry"
        onClick={onDelete}
        className="text-destructive hover:text-destructive h-8 w-8"
        data-ocid="water-delete"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

const QUICK_AMOUNTS = [250, 500, 750];

export default function Water() {
  const { data: log, isLoading } = useDailyWaterLog();
  const addWater = useAddWater();
  const deleteWater = useDeleteWater();
  const [customAmount, setCustomAmount] = useState("");
  const [goalOpen, setGoalOpen] = useState(false);

  const totalMl = Number(log?.totalMl ?? 0n);
  const goalMl = Number(log?.goalMl ?? 2000n);
  const percent = goalMl > 0 ? Math.round((totalMl / goalMl) * 100) : 0;

  const prevPercent = log?.entries
    ? Math.round(((totalMl - (log.entries.length > 0 ? 0 : 0)) / goalMl) * 100)
    : 0;

  // Show milestone toasts
  const handleAdd = (ml: number) => {
    const newTotal = totalMl + ml;
    const newPct = goalMl > 0 ? (newTotal / goalMl) * 100 : 0;
    addWater.mutate(ml, {
      onSuccess: () => {
        if (prevPercent < 50 && newPct >= 50) {
          toast.success("💦 Halfway to your goal! Great progress!");
        } else if (prevPercent < 100 && newPct >= 100) {
          toast.success("🎉 Daily water goal reached! Amazing!");
        } else {
          toast.success(`+${ml} ml logged`);
        }
      },
    });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Droplets className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Water Intake
            </h1>
            <p className="text-muted-foreground text-sm">
              Stay hydrated — every sip counts
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setGoalOpen(true)}
          data-ocid="water-set-goal"
          className="shrink-0"
        >
          <Settings2 className="h-4 w-4 mr-1" />
          Set goal
        </Button>
      </div>

      {/* Progress ring */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Skeleton className="h-44 w-44 rounded-full" />
        </div>
      ) : (
        <Card className="border-border shadow-soft">
          <CardContent className="pt-6 pb-6 flex flex-col items-center">
            <ProgressRing percent={percent} totalMl={totalMl} goalMl={goalMl} />
          </CardContent>
        </Card>
      )}

      {/* Quick-add */}
      <Card className="border-border shadow-soft">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground">
            Quick add
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            {QUICK_AMOUNTS.map((ml) => (
              <Button
                key={ml}
                type="button"
                variant="secondary"
                onClick={() => handleAdd(ml)}
                disabled={addWater.isPending}
                data-ocid={`water-quick-${ml}`}
              >
                + {ml} ml
              </Button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const n = Number.parseInt(customAmount);
              if (n > 0) {
                handleAdd(n);
                setCustomAmount("");
              }
            }}
            className="flex gap-2"
          >
            <Input
              type="number"
              min={1}
              max={2000}
              placeholder="Custom ml"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="max-w-[140px]"
              aria-label="Custom water amount in ml"
            />
            <Button
              type="submit"
              disabled={!customAmount || addWater.isPending}
              data-ocid="water-custom-add"
            >
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Today's entries */}
      <div className="space-y-3">
        <h2 className="font-semibold text-foreground">Today's log</h2>
        {isLoading ? (
          <Skeleton className="h-16 rounded-xl" />
        ) : !log?.entries.length ? (
          <Card className="border-border border-dashed" data-ocid="water-empty">
            <CardContent className="flex flex-col items-center py-8 gap-2 text-center">
              <Droplets className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">
                No entries yet — add your first glass!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {[...(log?.entries ?? [])].reverse().map((entry) => (
              <EntryRow
                key={String(entry.id)}
                entry={entry}
                onDelete={() => deleteWater.mutate(entry.id)}
              />
            ))}
          </div>
        )}
      </div>

      <SetGoalDialog
        open={goalOpen}
        current={goalMl}
        onClose={() => setGoalOpen(false)}
      />
    </div>
  );
}
