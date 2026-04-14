import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { SleepLog } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parseISO, subDays } from "date-fns";
import { Moon, Pencil, Star, Trash2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function useBackendActor() {
  return useActor(createActor);
}

function useSleepLogs() {
  const { actor, isFetching } = useBackendActor();
  const from = format(subDays(new Date(), 14), "yyyy-MM-dd");
  const to = format(new Date(), "yyyy-MM-dd");
  return useQuery<SleepLog[]>({
    queryKey: ["sleepLogs", from, to],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSleepLogs(from, to);
    },
    enabled: !!actor && !isFetching,
  });
}

function useLogSleep() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      date: string;
      bedtime: string;
      wakeTime: string;
      quality: number;
      notes: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const r = await actor.logSleep(
        data.date,
        data.bedtime,
        data.wakeTime,
        BigInt(data.quality),
        data.notes || null,
      );
      if (r.__kind__ === "err") throw new Error("Failed to log sleep");
      return r.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sleepLogs"] });
      toast.success("Sleep logged!");
    },
    onError: () => toast.error("Failed to log sleep"),
  });
}

function useUpdateSleep() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      bedtime: string;
      wakeTime: string;
      quality: number;
      notes: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const r = await actor.updateSleepLog(
        data.id,
        data.bedtime || null,
        data.wakeTime || null,
        BigInt(data.quality),
        data.notes || null,
      );
      if (r.__kind__ === "err") throw new Error("Update failed");
      return r.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sleepLogs"] });
      toast.success("Sleep entry updated");
    },
    onError: () => toast.error("Failed to update"),
  });
}

function useDeleteSleep() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      await actor.deleteSleepLog(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sleepLogs"] });
      toast.success("Entry deleted");
    },
    onError: () => toast.error("Failed to delete"),
  });
}

function calcHours(bedtime: string, wakeTime: string): number {
  const [bh, bm] = bedtime.split(":").map(Number);
  const [wh, wm] = wakeTime.split(":").map(Number);
  let mins = wh * 60 + wm - (bh * 60 + bm);
  if (mins < 0) mins += 24 * 60;
  return Math.round((mins / 60) * 10) / 10;
}

function StarRating({
  value,
  onChange,
}: { value: number; onChange?: (v: number) => void }) {
  return (
    <fieldset
      className="flex gap-1 border-0 p-0 m-0"
      aria-label="Sleep quality rating"
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          aria-label={`${s} star${s > 1 ? "s" : ""}`}
          onClick={() => onChange?.(s)}
          className={`transition-smooth ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
        >
          <Star
            className={`h-5 w-5 ${s <= value ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
        </button>
      ))}
    </fieldset>
  );
}

function WeeklyChart({ logs }: { logs: SleepLog[] }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(new Date(), 6 - i), "yyyy-MM-dd");
    const log = logs.find((l) => l.date === date);
    const hours = log ? calcHours(log.bedtime, log.wakeTime) : 0;
    return { date, hours, label: format(subDays(new Date(), 6 - i), "EEE") };
  });

  const maxHours = 10;

  return (
    <Card className="border-border shadow-soft">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Weekly Sleep (last 7 days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-28">
          {days.map(({ label, hours, date }) => (
            <div key={date} className="flex flex-col items-center flex-1 gap-1">
              <span className="text-xs text-muted-foreground font-mono">
                {hours > 0 ? `${hours}h` : ""}
              </span>
              <div
                className="w-full rounded-t-md bg-primary/15 relative"
                style={{ height: "80px" }}
              >
                <div
                  className="absolute bottom-0 w-full rounded-t-md bg-primary transition-smooth"
                  style={{
                    height: `${Math.min((hours / maxHours) * 100, 100)}%`,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface SleepFormValues {
  date: string;
  bedtime: string;
  wakeTime: string;
  quality: number;
  notes: string;
}

function SleepForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
}: {
  initial?: Partial<SleepFormValues>;
  onSubmit: (v: SleepFormValues) => void;
  onCancel?: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<SleepFormValues>({
    date: initial?.date ?? format(new Date(), "yyyy-MM-dd"),
    bedtime: initial?.bedtime ?? "22:00",
    wakeTime: initial?.wakeTime ?? "07:00",
    quality: initial?.quality ?? 3,
    notes: initial?.notes ?? "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label htmlFor="sleep-date">Date</Label>
          <Input
            id="sleep-date"
            type="date"
            value={form.date}
            max={format(new Date(), "yyyy-MM-dd")}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="bedtime">Bedtime</Label>
          <Input
            id="bedtime"
            type="time"
            value={form.bedtime}
            onChange={(e) =>
              setForm((f) => ({ ...f, bedtime: e.target.value }))
            }
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="waketime">Wake time</Label>
          <Input
            id="waketime"
            type="time"
            value={form.wakeTime}
            onChange={(e) =>
              setForm((f) => ({ ...f, wakeTime: e.target.value }))
            }
            required
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label>Sleep quality</Label>
        <StarRating
          value={form.quality}
          onChange={(v) => setForm((f) => ({ ...f, quality: v }))}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="sleep-notes">Notes (optional)</Label>
        <Textarea
          id="sleep-notes"
          placeholder="How did you feel? Any dreams?"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          rows={2}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={isPending} data-ocid="sleep-submit">
          {isPending ? "Saving…" : "Save sleep"}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default function Sleep() {
  const { data: logs = [], isLoading } = useSleepLogs();
  const logSleep = useLogSleep();
  const updateSleep = useUpdateSleep();
  const deleteSleep = useDeleteSleep();
  const [editingId, setEditingId] = useState<bigint | null>(null);

  const avgHours =
    logs.length > 0
      ? Math.round(
          (logs.reduce((s, l) => s + calcHours(l.bedtime, l.wakeTime), 0) /
            logs.length) *
            10,
        ) / 10
      : null;

  const sorted = [...logs].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <Moon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Sleep Tracker
          </h1>
          <p className="text-muted-foreground text-sm">
            Track your rest and improve your sleep patterns
          </p>
        </div>
      </div>

      {/* Stats */}
      {avgHours !== null && (
        <Card className="border-border shadow-soft bg-primary/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-primary">
                  {avgHours}h
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  avg per night
                </div>
              </div>
              <div className="flex-1 text-sm text-muted-foreground">
                {avgHours >= 7 && avgHours <= 9
                  ? "Great! You're hitting the recommended 7–9 hours."
                  : avgHours < 7
                    ? "You might benefit from a bit more rest. Aim for 7–9 hours."
                    : "You're sleeping more than average — check in with your body."}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Log form */}
      <Card className="border-border shadow-soft">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Log last night's sleep
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SleepForm
            onSubmit={(v) => logSleep.mutate(v)}
            isPending={logSleep.isPending}
          />
        </CardContent>
      </Card>

      {/* Weekly chart */}
      <WeeklyChart logs={logs} />

      {/* History */}
      <div className="space-y-3">
        <h2 className="font-semibold text-foreground">Sleep history</h2>
        {isLoading ? (
          ["s1", "s2", "s3"].map((k) => (
            <Skeleton key={k} className="h-24 rounded-xl" />
          ))
        ) : sorted.length === 0 ? (
          <Card className="border-border border-dashed" data-ocid="sleep-empty">
            <CardContent className="flex flex-col items-center py-10 gap-2 text-center">
              <Moon className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-muted-foreground">
                No sleep logs yet. Start by logging tonight's rest.
              </p>
            </CardContent>
          </Card>
        ) : (
          sorted.map((log) => (
            <Card
              key={String(log.id)}
              className="border-border shadow-soft"
              data-ocid={`sleep-entry-${log.id}`}
            >
              <CardContent className="pt-4 pb-4">
                {editingId === log.id ? (
                  <SleepForm
                    initial={{
                      date: log.date,
                      bedtime: log.bedtime,
                      wakeTime: log.wakeTime,
                      quality: Number(log.quality),
                      notes: log.notes ?? "",
                    }}
                    onSubmit={(v) =>
                      updateSleep.mutate(
                        { id: log.id, ...v },
                        { onSuccess: () => setEditingId(null) },
                      )
                    }
                    onCancel={() => setEditingId(null)}
                    isPending={updateSleep.isPending}
                  />
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground text-sm">
                          {format(parseISO(log.date), "EEE, MMM d")}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {calcHours(log.bedtime, log.wakeTime)}h slept
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>🌙 {log.bedtime}</span>
                        <span>→</span>
                        <span>☀️ {log.wakeTime}</span>
                      </div>
                      <StarRating value={Number(log.quality)} />
                      {log.notes && (
                        <p className="text-xs text-muted-foreground truncate">
                          {log.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Edit entry"
                        onClick={() => setEditingId(log.id)}
                        data-ocid="sleep-edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Delete entry"
                        onClick={() => deleteSleep.mutate(log.id)}
                        className="text-destructive hover:text-destructive"
                        data-ocid="sleep-delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
