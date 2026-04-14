import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, D as Droplets, n as Button, S as Skeleton, C as Card, e as CardContent, k as CardHeader, l as CardTitle, q as ue, b as useQuery, o as useQueryClient, p as useMutation, h as useActor, i as createActor } from "./index-Chdf2p0o.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Co7kACEJ.js";
import { I as Input } from "./input-Cu6OzIVX.js";
import { L as Label } from "./label-DSwR1ZcM.js";
import { f as format } from "./format-TACZ5VJz.js";
import { T as Trash2 } from "./trash-2-CFcnQdCp.js";
import "./index-BDOZE7B6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode);
function useBackendActor() {
  return useActor(createActor);
}
function useDailyWaterLog() {
  const { actor, isFetching } = useBackendActor();
  const today = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  return useQuery({
    queryKey: ["dailyWater", today],
    queryFn: async () => {
      if (!actor)
        return { date: today, totalMl: 0n, goalMl: 2000n, entries: [] };
      return actor.getDailyWaterLog(today);
    },
    enabled: !!actor && !isFetching
  });
}
function useAddWater() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  const today = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  return useMutation({
    mutationFn: async (amountMl) => {
      if (!actor) throw new Error("Actor not available");
      const r = await actor.addWaterIntake(today, BigInt(amountMl));
      if (r.__kind__ === "err") throw new Error("Failed to add water");
      return r.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dailyWater"] });
    },
    onError: () => ue.error("Failed to log water")
  });
}
function useDeleteWater() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      await actor.deleteWaterEntry(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dailyWater"] });
      ue.success("Entry removed");
    },
    onError: () => ue.error("Failed to remove entry")
  });
}
function useSetWaterGoal() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (goalMl) => {
      if (!actor) throw new Error("Actor not available");
      await actor.setWaterGoal(BigInt(goalMl));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dailyWater"] });
      ue.success("Goal updated!");
    },
    onError: () => ue.error("Failed to update goal")
  });
}
function ProgressRing({
  percent,
  totalMl,
  goalMl
}) {
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const filled = Math.min(percent / 100, 1) * circumference;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-flex items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: 180, height: 180, className: "-rotate-90", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: 90,
            cy: 90,
            r,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 12,
            className: "text-muted/40"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: 90,
            cy: 90,
            r,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 12,
            strokeDasharray: `${filled} ${circumference - filled}`,
            strokeLinecap: "round",
            className: "text-primary transition-smooth"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-7 w-7 text-primary mb-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-foreground", children: totalMl }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "/ ",
          goalMl,
          " ml"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-medium", children: percent >= 100 ? "🎉 Daily goal reached!" : percent >= 75 ? "💧 Almost there, keep going!" : percent >= 50 ? "💦 Halfway through your goal!" : "Start sipping — every drop counts!" })
  ] });
}
function SetGoalDialog({
  open,
  current,
  onClose
}) {
  const [val, setVal] = reactExports.useState(String(current));
  const setGoal = useSetWaterGoal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Set daily water goal" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          const n = Number.parseInt(val);
          if (n > 0) {
            setGoal.mutate(n, { onSuccess: onClose });
          }
        },
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "water-goal", children: "Goal (ml)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "water-goal",
                type: "number",
                min: 500,
                max: 5e3,
                step: 100,
                value: val,
                onChange: (e) => setVal(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: setGoal.isPending,
                "data-ocid": "water-goal-submit",
                children: "Save"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: onClose, children: "Cancel" })
          ] })
        ]
      }
    )
  ] }) });
}
function EntryRow({
  entry,
  onDelete
}) {
  const time = new Date(Number(entry.loggedAt) / 1e6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth",
      "data-ocid": `water-entry-${entry.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              String(entry.amountMl),
              " ml"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-2", children: Number.isNaN(time.getTime()) ? "" : format(time, "HH:mm") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "icon",
            variant: "ghost",
            "aria-label": "Remove entry",
            onClick: onDelete,
            className: "text-destructive hover:text-destructive h-8 w-8",
            "data-ocid": "water-delete",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
const QUICK_AMOUNTS = [250, 500, 750];
function Water() {
  const { data: log, isLoading } = useDailyWaterLog();
  const addWater = useAddWater();
  const deleteWater = useDeleteWater();
  const [customAmount, setCustomAmount] = reactExports.useState("");
  const [goalOpen, setGoalOpen] = reactExports.useState(false);
  const totalMl = Number((log == null ? void 0 : log.totalMl) ?? 0n);
  const goalMl = Number((log == null ? void 0 : log.goalMl) ?? 2000n);
  const percent = goalMl > 0 ? Math.round(totalMl / goalMl * 100) : 0;
  const prevPercent = (log == null ? void 0 : log.entries) ? Math.round((totalMl - (log.entries.length > 0 ? 0 : 0)) / goalMl * 100) : 0;
  const handleAdd = (ml) => {
    const newTotal = totalMl + ml;
    const newPct = goalMl > 0 ? newTotal / goalMl * 100 : 0;
    addWater.mutate(ml, {
      onSuccess: () => {
        if (prevPercent < 50 && newPct >= 50) {
          ue.success("💦 Halfway to your goal! Great progress!");
        } else if (prevPercent < 100 && newPct >= 100) {
          ue.success("🎉 Daily water goal reached! Amazing!");
        } else {
          ue.success(`+${ml} ml logged`);
        }
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Water Intake" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Stay hydrated — every sip counts" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => setGoalOpen(true),
          "data-ocid": "water-set-goal",
          className: "shrink-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-4 w-4 mr-1" }),
            "Set goal"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-44 rounded-full" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6 pb-6 flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRing, { percent, totalMl, goalMl }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-foreground", children: "Quick add" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: QUICK_AMOUNTS.map((ml) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "secondary",
            onClick: () => handleAdd(ml),
            disabled: addWater.isPending,
            "data-ocid": `water-quick-${ml}`,
            children: [
              "+ ",
              ml,
              " ml"
            ]
          },
          ml
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              const n = Number.parseInt(customAmount);
              if (n > 0) {
                handleAdd(n);
                setCustomAmount("");
              }
            },
            className: "flex gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: 1,
                  max: 2e3,
                  placeholder: "Custom ml",
                  value: customAmount,
                  onChange: (e) => setCustomAmount(e.target.value),
                  className: "max-w-[140px]",
                  "aria-label": "Custom water amount in ml"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: !customAmount || addWater.isPending,
                  "data-ocid": "water-custom-add",
                  children: "Add"
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Today's log" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }) : !(log == null ? void 0 : log.entries.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border border-dashed", "data-ocid": "water-empty", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center py-8 gap-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-10 w-10 text-muted-foreground/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No entries yet — add your first glass!" })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...(log == null ? void 0 : log.entries) ?? []].reverse().map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        EntryRow,
        {
          entry,
          onDelete: () => deleteWater.mutate(entry.id)
        },
        String(entry.id)
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SetGoalDialog,
      {
        open: goalOpen,
        current: goalMl,
        onClose: () => setGoalOpen(false)
      }
    )
  ] });
}
export {
  Water as default
};
