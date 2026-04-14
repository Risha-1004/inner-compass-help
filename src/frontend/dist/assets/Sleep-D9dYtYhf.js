import { r as reactExports, j as jsxRuntimeExports, M as Moon, C as Card, e as CardContent, k as CardHeader, l as CardTitle, S as Skeleton, g as Badge, n as Button, b as useQuery, o as useQueryClient, p as useMutation, h as useActor, q as ue, i as createActor } from "./index-Chdf2p0o.js";
import { I as Input } from "./input-Cu6OzIVX.js";
import { L as Label } from "./label-DSwR1ZcM.js";
import { T as Textarea } from "./textarea-DaWkEaNe.js";
import { t as toDate, c as constructFrom, f as format } from "./format-TACZ5VJz.js";
import { p as parseISO, P as Pencil } from "./parseISO-C1cwoaSu.js";
import { T as Trash2 } from "./trash-2-CFcnQdCp.js";
import { T as TrendingUp } from "./trending-up-DKlZzgl4.js";
import { S as Star } from "./star-CtTt4xU6.js";
import "./index-BDOZE7B6.js";
function addDays(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  _date.setDate(_date.getDate() + amount);
  return _date;
}
function subDays(date, amount) {
  return addDays(date, -amount);
}
function useBackendActor() {
  return useActor(createActor);
}
function useSleepLogs() {
  const { actor, isFetching } = useBackendActor();
  const from = format(subDays(/* @__PURE__ */ new Date(), 14), "yyyy-MM-dd");
  const to = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  return useQuery({
    queryKey: ["sleepLogs", from, to],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSleepLogs(from, to);
    },
    enabled: !!actor && !isFetching
  });
}
function useLogSleep() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not available");
      const r = await actor.logSleep(
        data.date,
        data.bedtime,
        data.wakeTime,
        BigInt(data.quality),
        data.notes || null
      );
      if (r.__kind__ === "err") throw new Error("Failed to log sleep");
      return r.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sleepLogs"] });
      ue.success("Sleep logged!");
    },
    onError: () => ue.error("Failed to log sleep")
  });
}
function useUpdateSleep() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not available");
      const r = await actor.updateSleepLog(
        data.id,
        data.bedtime || null,
        data.wakeTime || null,
        BigInt(data.quality),
        data.notes || null
      );
      if (r.__kind__ === "err") throw new Error("Update failed");
      return r.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sleepLogs"] });
      ue.success("Sleep entry updated");
    },
    onError: () => ue.error("Failed to update")
  });
}
function useDeleteSleep() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      await actor.deleteSleepLog(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sleepLogs"] });
      ue.success("Entry deleted");
    },
    onError: () => ue.error("Failed to delete")
  });
}
function calcHours(bedtime, wakeTime) {
  const [bh, bm] = bedtime.split(":").map(Number);
  const [wh, wm] = wakeTime.split(":").map(Number);
  let mins = wh * 60 + wm - (bh * 60 + bm);
  if (mins < 0) mins += 24 * 60;
  return Math.round(mins / 60 * 10) / 10;
}
function StarRating({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "fieldset",
    {
      className: "flex gap-1 border-0 p-0 m-0",
      "aria-label": "Sleep quality rating",
      children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "aria-label": `${s} star${s > 1 ? "s" : ""}`,
          onClick: () => onChange == null ? void 0 : onChange(s),
          className: `transition-smooth ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: `h-5 w-5 ${s <= value ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`
            }
          )
        },
        s
      ))
    }
  );
}
function WeeklyChart({ logs }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(/* @__PURE__ */ new Date(), 6 - i), "yyyy-MM-dd");
    const log = logs.find((l) => l.date === date);
    const hours = log ? calcHours(log.bedtime, log.wakeTime) : 0;
    return { date, hours, label: format(subDays(/* @__PURE__ */ new Date(), 6 - i), "EEE") };
  });
  const maxHours = 10;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-primary" }),
      "Weekly Sleep (last 7 days)"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-28", children: days.map(({ label, hours, date }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-1 gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: hours > 0 ? `${hours}h` : "" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-full rounded-t-md bg-primary/15 relative",
          style: { height: "80px" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 w-full rounded-t-md bg-primary transition-smooth",
              style: {
                height: `${Math.min(hours / maxHours * 100, 100)}%`
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
    ] }, date)) }) })
  ] });
}
function SleepForm({
  initial,
  onSubmit,
  onCancel,
  isPending
}) {
  const [form, setForm] = reactExports.useState({
    date: (initial == null ? void 0 : initial.date) ?? format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
    bedtime: (initial == null ? void 0 : initial.bedtime) ?? "22:00",
    wakeTime: (initial == null ? void 0 : initial.wakeTime) ?? "07:00",
    quality: (initial == null ? void 0 : initial.quality) ?? 3,
    notes: (initial == null ? void 0 : initial.notes) ?? ""
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        onSubmit(form);
      },
      className: "space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sleep-date", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "sleep-date",
                type: "date",
                value: form.date,
                max: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
                onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bedtime", children: "Bedtime" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "bedtime",
                type: "time",
                value: form.bedtime,
                onChange: (e) => setForm((f) => ({ ...f, bedtime: e.target.value })),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "waketime", children: "Wake time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "waketime",
                type: "time",
                value: form.wakeTime,
                onChange: (e) => setForm((f) => ({ ...f, wakeTime: e.target.value })),
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Sleep quality" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StarRating,
            {
              value: form.quality,
              onChange: (v) => setForm((f) => ({ ...f, quality: v }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sleep-notes", children: "Notes (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "sleep-notes",
              placeholder: "How did you feel? Any dreams?",
              value: form.notes,
              onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
              rows: 2
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isPending, "data-ocid": "sleep-submit", children: isPending ? "Saving…" : "Save sleep" }),
          onCancel && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: onCancel, children: "Cancel" })
        ] })
      ]
    }
  );
}
function Sleep() {
  const { data: logs = [], isLoading } = useSleepLogs();
  const logSleep = useLogSleep();
  const updateSleep = useUpdateSleep();
  const deleteSleep = useDeleteSleep();
  const [editingId, setEditingId] = reactExports.useState(null);
  const avgHours = logs.length > 0 ? Math.round(
    logs.reduce((s, l) => s + calcHours(l.bedtime, l.wakeTime), 0) / logs.length * 10
  ) / 10 : null;
  const sorted = [...logs].sort((a, b) => a.date < b.date ? 1 : -1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Sleep Tracker" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Track your rest and improve your sleep patterns" })
      ] })
    ] }),
    avgHours !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-soft bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl font-bold text-primary", children: [
          avgHours,
          "h"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "avg per night" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-sm text-muted-foreground", children: avgHours >= 7 && avgHours <= 9 ? "Great! You're hitting the recommended 7–9 hours." : avgHours < 7 ? "You might benefit from a bit more rest. Aim for 7–9 hours." : "You're sleeping more than average — check in with your body." })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg font-semibold text-foreground", children: "Log last night's sleep" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SleepForm,
        {
          onSubmit: (v) => logSleep.mutate(v),
          isPending: logSleep.isPending
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyChart, { logs }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Sleep history" }),
      isLoading ? ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, k)) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border border-dashed", "data-ocid": "sleep-empty", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center py-10 gap-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-10 w-10 text-muted-foreground/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No sleep logs yet. Start by logging tonight's rest." })
      ] }) }) : sorted.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border-border shadow-soft",
          "data-ocid": `sleep-entry-${log.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: editingId === log.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SleepForm,
            {
              initial: {
                date: log.date,
                bedtime: log.bedtime,
                wakeTime: log.wakeTime,
                quality: Number(log.quality),
                notes: log.notes ?? ""
              },
              onSubmit: (v) => updateSleep.mutate(
                { id: log.id, ...v },
                { onSuccess: () => setEditingId(null) }
              ),
              onCancel: () => setEditingId(null),
              isPending: updateSleep.isPending
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: format(parseISO(log.date), "EEE, MMM d") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                  calcHours(log.bedtime, log.wakeTime),
                  "h slept"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "🌙 ",
                  log.bedtime
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "→" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "☀️ ",
                  log.wakeTime
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: Number(log.quality) }),
              log.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: log.notes })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  "aria-label": "Edit entry",
                  onClick: () => setEditingId(log.id),
                  "data-ocid": "sleep-edit",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  "aria-label": "Delete entry",
                  onClick: () => deleteSleep.mutate(log.id),
                  className: "text-destructive hover:text-destructive",
                  "data-ocid": "sleep-delete",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }) })
        },
        String(log.id)
      ))
    ] })
  ] });
}
export {
  Sleep as default
};
