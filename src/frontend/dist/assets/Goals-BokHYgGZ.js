import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, T as Target, n as Button, m as motion, C as Card, e as CardContent, S as Skeleton, o as useQueryClient, p as useMutation, q as ue, b as useQuery, g as Badge, h as useActor, i as createActor } from "./index-Chdf2p0o.js";
import { I as Input } from "./input-Cu6OzIVX.js";
import { L as Label } from "./label-DSwR1ZcM.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Bf9XVmQW.js";
import { T as Textarea } from "./textarea-DaWkEaNe.js";
import { C as ChevronUp } from "./chevron-up-BNn2SrkE.js";
import { P as Plus } from "./plus-BzfKwx4k.js";
import { A as AnimatePresence } from "./index-BBuRJ3Ez.js";
import { T as TrendingUp } from "./trending-up-DKlZzgl4.js";
import { C as CircleCheck } from "./circle-check-BwKnBPQm.js";
import { T as TriangleAlert } from "./triangle-alert-E2hQD1OT.js";
import { T as Trash2 } from "./trash-2-CFcnQdCp.js";
import "./index-BDOZE7B6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function useBackendActor() {
  return useActor(createActor);
}
function useGoals(status) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["goals", status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGoals(status);
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateGoal() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      targetDate
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createGoal(title, description, targetDate);
      if (result.__kind__ === "err") throw new Error("Failed to create goal");
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      ue.success("Goal created! You've got this 💪");
    },
    onError: () => ue.error("Could not create goal. Please try again.")
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
      progress
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.updateGoal(
        goalId,
        title ?? null,
        description ?? null,
        targetDate ?? null,
        status ?? null,
        progress ?? null
      );
      if (result.__kind__ === "err") throw new Error("Failed to update goal");
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
    onError: () => ue.error("Could not update goal. Please try again.")
  });
}
function useDeleteGoal() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goalId) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteGoal(goalId);
      if (result.__kind__ === "err") throw new Error("Failed to delete goal");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      ue.success("Goal removed.");
    },
    onError: () => ue.error("Could not delete goal. Please try again.")
  });
}
const MILESTONES = {
  25: { emoji: "🌱", label: "Quarter way there!" },
  50: { emoji: "🔥", label: "Halfway done!" },
  75: { emoji: "⚡", label: "Almost there!" },
  100: { emoji: "🎉", label: "Goal achieved!" }
};
function getMilestone(prev, next) {
  for (const [pct, data] of Object.entries(MILESTONES)) {
    const p = Number(pct);
    if (prev < p && next >= p) return data;
  }
  return null;
}
function AddGoalForm({ onClose }) {
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [targetDate, setTargetDate] = reactExports.useState("");
  const createGoal = useCreateGoal();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    createGoal.mutate(
      {
        title: title.trim(),
        description: description.trim(),
        targetDate: targetDate || null
      },
      { onSuccess: onClose }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.2 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary/30 bg-primary/5 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "goal-title", className: "text-sm font-medium", children: [
            "What do you want to achieve?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "goal-title",
              "data-ocid": "goal-title-input",
              placeholder: "e.g. Run a 5k, Read 12 books this year…",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              required: true,
              autoFocus: true,
              className: "bg-background"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "goal-desc", className: "text-sm font-medium", children: [
            "Description",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "goal-desc",
              "data-ocid": "goal-desc-input",
              placeholder: "Why is this goal important to you?",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              rows: 2,
              className: "bg-background resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "goal-date", className: "text-sm font-medium", children: [
            "Target date",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "goal-date",
              "data-ocid": "goal-date-input",
              type: "date",
              value: targetDate,
              onChange: (e) => setTargetDate(e.target.value),
              className: "bg-background"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: onClose,
              "data-ocid": "goal-form-cancel",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              size: "sm",
              disabled: !title.trim() || createGoal.isPending,
              "data-ocid": "goal-form-save",
              children: createGoal.isPending ? "Saving…" : "Save goal"
            }
          )
        ] })
      ] }) }) })
    }
  );
}
function ProgressBar({ value }) {
  const clipped = Math.min(100, Math.max(0, value));
  const color = clipped >= 75 ? "bg-accent" : clipped >= 50 ? "bg-primary" : clipped >= 25 ? "bg-primary/70" : "bg-primary/40";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-2 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: `absolute inset-y-0 left-0 rounded-full ${color}`,
      initial: { width: 0 },
      animate: { width: `${clipped}%` },
      transition: { duration: 0.5, ease: "easeOut" }
    }
  ) });
}
function GoalCard({ goal }) {
  const updateGoal = useUpdateGoal();
  const deleteGoal = useDeleteGoal();
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const [milestone, setMilestone] = reactExports.useState(null);
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
  const handleStatus = (newStatus) => {
    if (newStatus === "completed") {
      const hit = getMilestone(progress, 100);
      if (hit) {
        setMilestone(hit);
        setTimeout(() => setMilestone(null), 2500);
      }
    }
    updateGoal.mutate({ goalId: goal.id, status: newStatus });
    ue.success(
      newStatus === "completed" ? "🎉 Goal marked complete!" : "Goal marked as abandoned."
    );
  };
  const handleDelete = () => {
    if (confirmDelete) {
      deleteGoal.mutate(goal.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.96 },
      transition: { duration: 0.25 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "relative overflow-hidden shadow-soft transition-smooth hover:shadow-elevated border-border",
          "data-ocid": `goal-card-${goal.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${goal.status === "completed" ? "bg-accent" : goal.status === "abandoned" ? "bg-muted-foreground/40" : "bg-primary"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pl-5 pt-4 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: milestone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.8, y: -8 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.8, y: -8 },
                  className: "absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-primary-foreground text-xs font-medium shadow-elevated",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: milestone.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: milestone.label })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight truncate", children: goal.title }),
                    goal.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "secondary",
                        className: "shrink-0 bg-accent/20 text-accent-foreground border-accent/30",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
                          "Done"
                        ]
                      }
                    ),
                    goal.status === "abandoned" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "shrink-0 text-muted-foreground",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                          "Abandoned"
                        ]
                      }
                    )
                  ] }),
                  goal.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm line-clamp-2 leading-relaxed", children: goal.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: confirmDelete ? "destructive" : "ghost",
                    size: "icon",
                    className: "shrink-0 h-7 w-7",
                    onClick: handleDelete,
                    "aria-label": confirmDelete ? "Confirm delete" : "Delete goal",
                    "data-ocid": `goal-delete-${goal.id}`,
                    children: confirmDelete ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                  }
                )
              ] }),
              goal.targetDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Target:",
                  " ",
                  new Date(goal.targetDate).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                ] })
              ] }),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
                    "Progress"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                    progress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: progress }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "icon",
                      className: "h-6 w-6 shrink-0 rounded-full border-primary/40 text-primary hover:bg-primary/10",
                      onClick: handleProgressStep,
                      "aria-label": "Increase progress by 10%",
                      "data-ocid": `goal-progress-inc-${goal.id}`,
                      disabled: progress >= 100 || updateGoal.isPending,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 pt-0.5", children: [25, 50, 75, 100].map((pct) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center gap-1 text-xs rounded-full px-2 py-0.5 transition-smooth ${progress >= pct ? "bg-primary/15 text-primary font-medium" : "bg-muted text-muted-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: MILESTONES[pct].emoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        pct,
                        "%"
                      ] })
                    ]
                  },
                  pct
                )) })
              ] }),
              goal.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-sm text-accent-foreground bg-accent/10 rounded-lg px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Amazing work — you completed this goal! 🎊" })
              ] }),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3 pt-3 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "flex-1 text-xs border-accent/40 text-foreground hover:bg-accent/10",
                    onClick: () => handleStatus("completed"),
                    "data-ocid": `goal-complete-${goal.id}`,
                    disabled: updateGoal.isPending,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1.5 text-accent" }),
                      "Mark complete"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "flex-1 text-xs text-muted-foreground hover:text-foreground",
                    onClick: () => handleStatus("abandoned"),
                    "data-ocid": `goal-abandon-${goal.id}`,
                    disabled: updateGoal.isPending,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "Abandon"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function GoalList({
  status,
  emptyMessage,
  emptyIcon
}) {
  const { data: goals, isLoading } = useGoals(status);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }, i)) });
  }
  if (!goals || goals.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "goals-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: emptyIcon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs leading-relaxed", children: emptyMessage })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: goals.map((goal) => /* @__PURE__ */ jsxRuntimeExports.jsx(GoalCard, { goal }, String(goal.id))) }) });
}
function Goals() {
  const [showForm, setShowForm] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-7 h-7 text-primary" }),
          "Goals"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Set intentions, track progress, celebrate wins." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => setShowForm((v) => !v),
          size: "sm",
          "data-ocid": "add-goal-btn",
          className: "shrink-0",
          children: showForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 mr-1.5" }),
            "Collapse"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
            "New goal"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(AddGoalForm, { onClose: () => setShowForm(false) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "active", "data-ocid": "goals-tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "active", "data-ocid": "tab-active", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 mr-1.5" }),
          "Active"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "completed", "data-ocid": "tab-completed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1.5" }),
          "Completed"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "abandoned", "data-ocid": "tab-abandoned", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1.5" }),
          "Abandoned"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        GoalList,
        {
          status: "active",
          emptyMessage: "What do you want to achieve? Set your first goal and start making it happen!",
          emptyIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-10 h-10 text-muted-foreground/50" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "completed", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        GoalList,
        {
          status: "completed",
          emptyMessage: "No completed goals yet — keep working toward your active ones!",
          emptyIcon: "🏆"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "abandoned", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        GoalList,
        {
          status: "abandoned",
          emptyMessage: "No abandoned goals. Every goal you set is a step in the right direction.",
          emptyIcon: "💪"
        }
      ) })
    ] })
  ] });
}
export {
  Goals as default
};
