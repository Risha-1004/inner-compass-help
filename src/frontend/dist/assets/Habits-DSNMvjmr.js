import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, s as cn, m as motion, n as Button, C as Card, e as CardContent, S as Skeleton, b as useQuery, o as useQueryClient, p as useMutation, g as Badge, t as DropdownMenu, v as DropdownMenuTrigger, w as DropdownMenuContent, x as DropdownMenuItem, X, h as useActor, q as ue, i as createActor } from "./index-Chdf2p0o.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-Co7kACEJ.js";
import { I as Input } from "./input-Cu6OzIVX.js";
import { L as Label } from "./label-DSwR1ZcM.js";
import { P as Primitive } from "./index-BDOZE7B6.js";
import { P as Plus } from "./plus-BzfKwx4k.js";
import { A as AnimatePresence } from "./index-BBuRJ3Ez.js";
import { F as Flame } from "./flame-BniEnvBK.js";
import { T as Trash2 } from "./trash-2-CFcnQdCp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
];
const Archive = createLucideIcon("archive", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
];
const EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function today() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function nDaysAgo(n) {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}
function useBackendActor() {
  return useActor(createActor);
}
function useHabits() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["habits"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHabits();
    },
    enabled: !!actor && !isFetching
  });
}
function useWeekCompletions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["habitCompletions", "week"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHabitCompletions(nDaysAgo(6), today());
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function useHabitStreak(habitId, enabled) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["habitStreak", habitId.toString()],
    queryFn: async () => {
      if (!actor) return { habitId, currentStreak: 0n, longestStreak: 0n };
      return actor.getHabitStreak(habitId, today());
    },
    enabled: !!actor && !isFetching && enabled,
    staleTime: 1e3 * 60
  });
}
function useCreateHabit() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      color,
      icon
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createHabit(name, color, icon);
      if (result.__kind__ === "err") throw new Error("Failed to create habit");
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      ue.success("Habit created! 🎯");
    },
    onError: () => ue.error("Could not create habit.")
  });
}
function useArchiveHabit() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.archiveHabit(id);
      if (result.__kind__ === "err") throw new Error("Archive failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      ue.success("Habit archived");
    },
    onError: () => ue.error("Could not archive habit.")
  });
}
function useDeleteHabit() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteHabit(id);
      if (result.__kind__ === "err") throw new Error("Delete failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habits"] });
      qc.invalidateQueries({ queryKey: ["habitCompletions"] });
      ue.success("Habit deleted");
    },
    onError: () => ue.error("Could not delete habit.")
  });
}
function useSetHabitCompletion() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      habitId,
      date,
      completed
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.setHabitCompletion(habitId, date, completed);
      if (result.__kind__ === "err") throw new Error("Toggle failed");
      return result.ok;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["habitCompletions"] });
      qc.invalidateQueries({
        queryKey: ["habitStreak", vars.habitId.toString()]
      });
    },
    onError: () => ue.error("Could not update habit.")
  });
}
const PRESET_COLORS = [
  "#7C6AF7",
  "#4EAAD1",
  "#E07B54",
  "#5DBB8A",
  "#D45E91",
  "#F4B942",
  "#A78BFA",
  "#60C7B5"
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
  "🎨"
];
const MILESTONE_STREAKS = [7, 30, 100];
function AddHabitDialog({
  open,
  onClose
}) {
  const [name, setName] = reactExports.useState("");
  const [color, setColor] = reactExports.useState(PRESET_COLORS[0]);
  const [icon, setIcon] = reactExports.useState(PRESET_ICONS[0]);
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
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "add-habit-dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create a new habit" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "habit-name", children: "Habit name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "habit-name",
            placeholder: "e.g. Morning walk",
            value: name,
            onChange: (e) => setName(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleSubmit(),
            "data-ocid": "habit-name-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-8 gap-1.5", children: PRESET_ICONS.map((ic) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIcon(ic),
            className: [
              "text-xl p-1.5 rounded-lg transition-smooth hover:bg-muted",
              icon === ic ? "bg-primary/15 ring-2 ring-primary" : "bg-muted/40"
            ].join(" "),
            "aria-label": `Icon ${ic}`,
            "data-ocid": `habit-icon-${ic}`,
            children: ic
          },
          ic
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Color" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: PRESET_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setColor(c),
            className: [
              "h-8 w-8 rounded-full transition-smooth hover:scale-110",
              color === c ? "ring-2 ring-offset-2 ring-foreground" : ""
            ].join(" "),
            style: { backgroundColor: c },
            "aria-label": `Color ${c}`,
            "data-ocid": `habit-color-${c}`
          },
          c
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-10 w-10 rounded-full flex items-center justify-center text-xl flex-shrink-0",
            style: { backgroundColor: `${color}25` },
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: name || "Your habit name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-3 w-3 rounded-full ml-auto flex-shrink-0",
            style: { backgroundColor: color }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: onClose,
          "data-ocid": "add-habit-cancel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-1" }),
            " Cancel"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleSubmit,
          disabled: !name.trim() || createHabit.isPending,
          "data-ocid": "add-habit-submit",
          children: createHabit.isPending ? "Creating…" : "Create Habit"
        }
      )
    ] })
  ] }) });
}
function HabitRow({
  habit,
  completions,
  onToggle,
  isToggling
}) {
  const archive = useArchiveHabit();
  const del = useDeleteHabit();
  const { data: streak } = useHabitStreak(habit.id, true);
  const currentStreak = Number((streak == null ? void 0 : streak.currentStreak) ?? 0n);
  const todayCompletion = reactExports.useMemo(
    () => {
      var _a;
      return ((_a = completions.find((c) => c.habitId === habit.id && c.date === today())) == null ? void 0 : _a.completed) ?? false;
    },
    [completions, habit.id]
  );
  const weekRate = reactExports.useMemo(() => {
    const past7 = completions.filter((c) => c.habitId === habit.id);
    const completed = past7.filter((c) => c.completed).length;
    return past7.length > 0 ? Math.round(completed / 7 * 100) : 0;
  }, [completions, habit.id]);
  const isMilestone = MILESTONE_STREAKS.includes(currentStreak);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95 },
      className: [
        "flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border transition-smooth",
        isMilestone ? "ring-2 ring-primary/50 shadow-elevated" : "shadow-soft"
      ].join(" "),
      "data-ocid": "habit-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-10 w-10 rounded-full flex items-center justify-center text-xl flex-shrink-0",
            style: { backgroundColor: `${habit.color}20` },
            children: habit.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: habit.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-2 w-2 rounded-full flex-shrink-0",
                style: { backgroundColor: habit.color }
              }
            ),
            currentStreak > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: [
                  "text-xs flex items-center gap-0.5 flex-shrink-0",
                  isMilestone ? "bg-primary/15 text-primary" : ""
                ].join(" "),
                "data-ocid": "habit-streak-badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3 w-3" }),
                  currentStreak,
                  "d",
                  isMilestone && " 🎉"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Progress,
              {
                value: weekRate,
                className: "h-1.5 flex-1",
                "data-ocid": "habit-progress-bar"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground flex-shrink-0", children: [
              weekRate,
              "% this week"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onToggle(habit.id, !todayCompletion),
            disabled: isToggling,
            "aria-label": todayCompletion ? "Mark incomplete" : "Mark complete",
            className: [
              "h-9 w-9 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
              "transition-smooth hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              todayCompletion ? "border-transparent text-white" : "border-border bg-muted/40 text-muted-foreground"
            ].join(" "),
            style: todayCompletion ? { backgroundColor: habit.color } : {},
            "data-ocid": "habit-toggle-btn",
            children: todayCompletion ? "✓" : ""
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7 flex-shrink-0",
              "aria-label": "Habit options",
              "data-ocid": "habit-menu-trigger",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuItem,
              {
                onClick: () => archive.mutate(habit.id),
                disabled: archive.isPending,
                "data-ocid": "habit-archive-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-4 w-4 mr-2" }),
                  "Archive"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuItem,
              {
                onClick: () => del.mutate(habit.id),
                disabled: del.isPending,
                className: "text-destructive focus:text-destructive",
                "data-ocid": "habit-delete-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                  "Delete"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function Habits() {
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const { data: habits = [], isLoading: habitsLoading } = useHabits();
  const { data: completions = [], isLoading: completionsLoading } = useWeekCompletions();
  const toggleCompletion = useSetHabitCompletion();
  const activeHabits = reactExports.useMemo(
    () => habits.filter((h) => !h.isArchived),
    [habits]
  );
  const isLoading = habitsLoading || completionsLoading;
  const handleToggle = reactExports.useCallback(
    (habitId, completed) => {
      toggleCompletion.mutate({ habitId, date: today(), completed });
    },
    [toggleCompletion]
  );
  const completedToday = reactExports.useMemo(() => {
    const todayStr = today();
    return completions.filter((c) => c.date === todayStr && c.completed).length;
  }, [completions]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl mx-auto pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex items-start justify-between gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Habit Tracker" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Small steps, big changes — track your daily commitments." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setDialogOpen(true),
              className: "flex-shrink-0",
              "data-ocid": "add-habit-trigger",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                "Add Habit"
              ]
            }
          )
        ]
      }
    ),
    !isLoading && activeHabits.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1, duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Today's progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-primary", children: [
              completedToday,
              " / ",
              activeHabits.length
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              value: activeHabits.length > 0 ? completedToday / activeHabits.length * 100 : 0,
              className: "h-2",
              "data-ocid": "daily-progress-bar"
            }
          ),
          completedToday === activeHabits.length && activeHabits.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-medium mt-2 text-center", children: "🎉 All habits completed today! Amazing work!" })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Today's Habits" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }) : activeHabits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "flex flex-col items-center justify-center py-16 rounded-xl bg-muted/30 text-center",
          "data-ocid": "habits-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", children: "🌱" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No habits yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 mb-4", children: "Start building your daily routines" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: () => setDialogOpen(true),
                "data-ocid": "habits-empty-cta",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                  "Create your first habit"
                ]
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: activeHabits.map((habit, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.06, duration: 0.35 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            HabitRow,
            {
              habit,
              completions,
              onToggle: handleToggle,
              isToggling: toggleCompletion.isPending
            }
          )
        },
        String(habit.id)
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddHabitDialog, { open: dialogOpen, onClose: () => setDialogOpen(false) })
  ] });
}
export {
  Habits as default
};
