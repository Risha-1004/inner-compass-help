import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "@/hooks/useProfile";
import type { CycleLog, SymptomsLog } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { differenceInDays, format, parseISO } from "date-fns";
import { FlowerIcon, Heart, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function useBackendActor() {
  return useActor(createActor);
}

function useCycleLogs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<CycleLog[]>({
    queryKey: ["cycleLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCycleLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

function useSymptomsLogs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SymptomsLog[]>({
    queryKey: ["symptomsLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSymptomsLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

function useAddCycle() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      startDate: string;
      endDate: string;
      flowIntensity: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const r = await actor.addCycleLog(
        data.startDate,
        data.endDate || null,
        data.flowIntensity,
      );
      if (r.__kind__ === "err") throw new Error("Failed to log cycle");
      return r.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cycleLogs"] });
      toast.success("Cycle logged!");
    },
    onError: () => toast.error("Failed to log cycle"),
  });
}

function useUpdateCycle() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      endDate: string;
      flowIntensity: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const r = await actor.updateCycleLog(
        data.id,
        data.endDate || null,
        data.flowIntensity || null,
      );
      if (r.__kind__ === "err") throw new Error("Update failed");
      return r.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cycleLogs"] });
      toast.success("Cycle updated");
    },
    onError: () => toast.error("Failed to update"),
  });
}

function useDeleteCycle() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      await actor.deleteCycleLog(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cycleLogs"] });
      toast.success("Entry removed");
    },
  });
}

function useAddSymptoms() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { date: string; symptoms: string[] }) => {
      if (!actor) throw new Error("Actor not available");
      const r = await actor.addSymptomsLog(data.date, data.symptoms);
      if (r.__kind__ === "err") throw new Error("Failed");
      return r.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["symptomsLogs"] });
      toast.success("Symptoms logged!");
    },
    onError: () => toast.error("Failed to log symptoms"),
  });
}

function useDeleteSymptoms() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      await actor.deleteSymptomsLog(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["symptomsLogs"] });
      toast.success("Removed");
    },
  });
}

const SYMPTOM_TAGS = [
  "cramps",
  "bloating",
  "headache",
  "fatigue",
  "mood changes",
  "spotting",
  "back pain",
  "nausea",
  "breast tenderness",
  "insomnia",
];

const FLOW_LABELS: Record<string, string> = {
  light: "💧 Light",
  moderate: "💦 Moderate",
  heavy: "🌊 Heavy",
};

function FlowBadge({ flow }: { flow: string }) {
  const colorMap: Record<string, string> = {
    light: "bg-primary/10 text-primary",
    moderate: "bg-primary/20 text-primary",
    heavy: "bg-primary/35 text-primary",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${colorMap[flow] ?? "bg-muted text-muted-foreground"}`}
    >
      {FLOW_LABELS[flow] ?? flow}
    </span>
  );
}

interface CycleFormValues {
  startDate: string;
  endDate: string;
  flowIntensity: string;
}

function CycleForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
}: {
  initial?: Partial<CycleFormValues>;
  onSubmit: (v: CycleFormValues) => void;
  onCancel?: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<CycleFormValues>({
    startDate: initial?.startDate ?? format(new Date(), "yyyy-MM-dd"),
    endDate: initial?.endDate ?? "",
    flowIntensity: initial?.flowIntensity ?? "moderate",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="cycle-start">Start date</Label>
          <input
            id="cycle-start"
            type="date"
            value={form.startDate}
            max={format(new Date(), "yyyy-MM-dd")}
            onChange={(e) =>
              setForm((f) => ({ ...f, startDate: e.target.value }))
            }
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="cycle-end">End date (optional)</Label>
          <input
            id="cycle-end"
            type="date"
            value={form.endDate}
            min={form.startDate}
            max={format(new Date(), "yyyy-MM-dd")}
            onChange={(e) =>
              setForm((f) => ({ ...f, endDate: e.target.value }))
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="flow-select">Flow intensity</Label>
        <Select
          value={form.flowIntensity}
          onValueChange={(v) => setForm((f) => ({ ...f, flowIntensity: v }))}
        >
          <SelectTrigger id="flow-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">💧 Light</SelectItem>
            <SelectItem value="moderate">💦 Moderate</SelectItem>
            <SelectItem value="heavy">🌊 Heavy</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={isPending} data-ocid="cycle-submit">
          {isPending ? "Saving…" : "Save cycle"}
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

function SymptomsPanel({ logs }: { logs: SymptomsLog[] }) {
  const addSymptoms = useAddSymptoms();
  const deleteSymptoms = useDeleteSymptoms();
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const toggle = (tag: string) =>
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const sorted = [...logs].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="space-y-5">
      <Card className="border-border shadow-soft">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground">
            Log symptoms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="symptom-date">Date</Label>
            <input
              id="symptom-date"
              type="date"
              value={date}
              max={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => setDate(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 max-w-[200px]"
            />
          </div>
          <div>
            <Label className="mb-2 block">Symptoms</Label>
            <fieldset className="flex flex-wrap gap-2 border-0 p-0 m-0">
              <legend className="sr-only">Symptom tags</legend>
              {SYMPTOM_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={selected.includes(tag)}
                  onClick={() => toggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-smooth focus-visible:ring-2 focus-visible:ring-ring ${
                    selected.includes(tag)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:bg-muted/70"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </fieldset>
          </div>
          <Button
            type="button"
            disabled={selected.length === 0 || addSymptoms.isPending}
            onClick={() =>
              addSymptoms.mutate(
                { date, symptoms: selected },
                { onSuccess: () => setSelected([]) },
              )
            }
            data-ocid="symptom-submit"
          >
            {addSymptoms.isPending ? "Saving…" : "Log symptoms"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Symptoms history</h3>
        {sorted.length === 0 ? (
          <Card
            className="border-dashed border-border"
            data-ocid="symptoms-empty"
          >
            <CardContent className="flex flex-col items-center py-8 gap-2 text-center">
              <Heart className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No symptoms logged yet
              </p>
            </CardContent>
          </Card>
        ) : (
          sorted.map((log) => (
            <Card
              key={String(log.id)}
              className="border-border shadow-soft"
              data-ocid={`symptom-entry-${log.id}`}
            >
              <CardContent className="pt-3 pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {format(parseISO(log.date), "EEE, MMM d, yyyy")}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {log.symptoms.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label="Delete symptom log"
                    onClick={() => deleteSymptoms.mutate(log.id)}
                    className="text-destructive hover:text-destructive shrink-0"
                    data-ocid="symptom-delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function CycleHistory({ logs }: { logs: CycleLog[] }) {
  const updateCycle = useUpdateCycle();
  const deleteCycle = useDeleteCycle();
  const [editingId, setEditingId] = useState<bigint | null>(null);

  const sorted = [...logs].sort((a, b) => (a.startDate < b.startDate ? 1 : -1));

  // Average cycle length
  let avgLength: number | null = null;
  if (sorted.length >= 2) {
    const lengths: number[] = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      const diff = differenceInDays(
        parseISO(sorted[i].startDate),
        parseISO(sorted[i + 1].startDate),
      );
      if (diff > 0) lengths.push(diff);
    }
    if (lengths.length > 0) {
      avgLength = Math.round(
        lengths.reduce((a, b) => a + b, 0) / lengths.length,
      );
    }
  }

  return (
    <div className="space-y-5">
      {avgLength !== null && (
        <Card className="border-border bg-primary/5 shadow-soft">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">
                  {avgLength}
                </div>
                <div className="text-xs text-muted-foreground">
                  days avg cycle
                </div>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                {avgLength >= 21 && avgLength <= 35
                  ? "Your cycle length is within a typical range."
                  : "Cycle lengths vary — if you have concerns, speaking with a healthcare provider is always a good idea."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {sorted.length === 0 ? (
        <Card className="border-dashed border-border" data-ocid="cycle-empty">
          <CardContent className="flex flex-col items-center py-10 gap-2 text-center">
            <FlowerIcon className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">
              No cycles logged yet — start tracking below
            </p>
          </CardContent>
        </Card>
      ) : (
        sorted.map((log) => (
          <Card
            key={String(log.id)}
            className="border-border shadow-soft"
            data-ocid={`cycle-entry-${log.id}`}
          >
            <CardContent className="pt-4 pb-4">
              {editingId === log.id ? (
                <CycleForm
                  initial={{
                    startDate: log.startDate,
                    endDate: log.endDate ?? "",
                    flowIntensity: log.flowIntensity,
                  }}
                  onSubmit={(v) =>
                    updateCycle.mutate(
                      {
                        id: log.id,
                        endDate: v.endDate,
                        flowIntensity: v.flowIntensity,
                      },
                      { onSuccess: () => setEditingId(null) },
                    )
                  }
                  onCancel={() => setEditingId(null)}
                  isPending={updateCycle.isPending}
                />
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">
                        {format(parseISO(log.startDate), "MMM d")}
                        {log.endDate
                          ? ` – ${format(parseISO(log.endDate), "MMM d, yyyy")}`
                          : " (ongoing)"}
                      </span>
                      <FlowBadge flow={log.flowIntensity} />
                    </div>
                    {log.endDate && (
                      <p className="text-xs text-muted-foreground">
                        {differenceInDays(
                          parseISO(log.endDate),
                          parseISO(log.startDate),
                        ) + 1}{" "}
                        days
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Edit cycle entry"
                      onClick={() => setEditingId(log.id)}
                      data-ocid="cycle-edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Delete cycle entry"
                      onClick={() => deleteCycle.mutate(log.id)}
                      className="text-destructive hover:text-destructive"
                      data-ocid="cycle-delete"
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
  );
}

function NotForUser() {
  return (
    <Card className="border-border shadow-soft max-w-md mx-auto mt-10">
      <CardContent className="flex flex-col items-center py-12 gap-4 text-center px-8">
        <FlowerIcon className="h-12 w-12 text-primary/50" />
        <h2 className="font-display text-xl font-semibold text-foreground">
          This section is for people who have periods
        </h2>
        <p className="text-muted-foreground text-sm">
          You can update this preference at any time in your{" "}
          <a
            href="/settings"
            className="underline underline-offset-4 text-primary hover:text-primary/80"
          >
            Settings
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
}

export default function Cycle() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: cycleLogs = [], isLoading: cycleLoading } = useCycleLogs();
  const { data: symptomsLogs = [], isLoading: symptomsLoading } =
    useSymptomsLogs();
  const addCycle = useAddCycle();
  const isLoading = cycleLoading || symptomsLoading;

  if (profileLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
    );
  }

  if (profile?.onboarding?.hasPeriods !== true) {
    return <NotForUser />;
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10">
          <FlowerIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Cycle Tracker
          </h1>
          <p className="text-muted-foreground text-sm">
            A warm, supportive space for your cycle journey
          </p>
        </div>
      </div>

      <Tabs defaultValue="history">
        <TabsList className="mb-4">
          <TabsTrigger value="history">Cycles</TabsTrigger>
          <TabsTrigger value="log">Log period</TabsTrigger>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-0">
          {isLoading ? (
            <div className="space-y-3">
              {["ck1", "ck2"].map((k) => (
                <Skeleton key={k} className="h-20 rounded-xl" />
              ))}
            </div>
          ) : (
            <CycleHistory logs={cycleLogs} />
          )}
        </TabsContent>

        <TabsContent value="log" className="mt-0">
          <Card className="border-border shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">
                Log a period
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CycleForm
                onSubmit={(v) => addCycle.mutate(v)}
                isPending={addCycle.isPending}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms" className="mt-0">
          {isLoading ? (
            <Skeleton className="h-20 rounded-xl" />
          ) : (
            <SymptomsPanel logs={symptomsLogs} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
