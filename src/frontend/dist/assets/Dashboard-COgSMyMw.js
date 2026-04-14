import { c as createLucideIcon, u as useAppStore, a as useAuth, j as jsxRuntimeExports, m as motion, S as Skeleton, T as Target, b as useQuery, d as useDailyAffirmation, C as Card, e as CardContent, f as Sparkles, B as BookOpen, M as Moon, D as Droplets, W as Wind, L as Link, g as Badge, h as useActor, i as createActor } from "./index-Chdf2p0o.js";
import { F as Flame } from "./flame-BniEnvBK.js";
import { S as Star } from "./star-CtTt4xU6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M22 11v1a10 10 0 1 1-9-10", key: "ew0xw9" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }],
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }]
];
const SmilePlus = createLucideIcon("smile-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
function useBackendActor() {
  return useActor(createActor);
}
function useTodayMood() {
  const { actor, isFetching } = useBackendActor();
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  return useQuery({
    queryKey: ["moodEntries", today],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMoodEntries(today, today);
    },
    enabled: !!actor && !isFetching
  });
}
function useTodayHabits() {
  const { actor, isFetching } = useBackendActor();
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  return useQuery({
    queryKey: ["habitsToday", today],
    queryFn: async () => {
      if (!actor) return { habits: [], completions: [] };
      const [habits, completions] = await Promise.all([
        actor.getHabits(),
        actor.getHabitCompletions(today, today)
      ]);
      return { habits: habits.filter((h) => !h.isArchived), completions };
    },
    enabled: !!actor && !isFetching
  });
}
function useActiveGoals() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["goals", "active"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGoals("active");
    },
    enabled: !!actor && !isFetching
  });
}
function useRecentActivity() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["recentMood"],
    queryFn: async () => {
      if (!actor) return [];
      const from = new Date(Date.now() - 7 * 864e5).toISOString().split("T")[0];
      const to = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const entries = await actor.getMoodEntries(from, to);
      return entries.slice(-3).reverse();
    },
    enabled: !!actor && !isFetching
  });
}
function getGreeting() {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function formatRelativeDate(dateStr) {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 864e5).toISOString().split("T")[0];
  if (dateStr === today) return "Today";
  if (dateStr === yesterday) return "Yesterday";
  return new Date(dateStr).toLocaleDateString(void 0, {
    month: "short",
    day: "numeric"
  });
}
function AffirmationCard() {
  const { data: affirmation, isLoading } = useDailyAffirmation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "relative overflow-hidden border-primary/20 bg-primary/5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 20, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-primary uppercase tracking-wider mb-1", children: "Daily Affirmation" }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground leading-snug", children: affirmation ?? "You are worthy of care and kindness." })
          ] })
        ] }) })
      ] })
    }
  );
}
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  delay,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay, ease: "easeOut" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft hover:shadow-elevated transition-smooth border-border/60 h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${color}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base truncate", children: value }),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: sub })
        ] })
      ] }) })
    }
  );
}
const QUICK_ACTIONS = [
  {
    label: "Log Mood",
    icon: SmilePlus,
    to: "/mood",
    color: "text-chart-1",
    bg: "bg-chart-1/10 hover:bg-chart-1/20"
  },
  {
    label: "Track Habits",
    icon: Flame,
    to: "/habits",
    color: "text-primary",
    bg: "bg-primary/10 hover:bg-primary/20"
  },
  {
    label: "Write Journal",
    icon: BookOpen,
    to: "/journal",
    color: "text-chart-2",
    bg: "bg-chart-2/10 hover:bg-chart-2/20"
  },
  {
    label: "Log Sleep",
    icon: Moon,
    to: "/sleep",
    color: "text-chart-5",
    bg: "bg-chart-5/10 hover:bg-chart-5/20"
  },
  {
    label: "Log Water",
    icon: Droplets,
    to: "/water",
    color: "text-chart-3",
    bg: "bg-chart-3/10 hover:bg-chart-3/20"
  },
  {
    label: "Breathe",
    icon: Wind,
    to: "/breathing",
    color: "text-accent",
    bg: "bg-accent/10 hover:bg-accent/20"
  }
];
function QuickActions() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "Quick Actions" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-6 gap-3", children: QUICK_ACTIONS.map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.92 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.35, delay: 0.1 + i * 0.05 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: action.to,
            "data-ocid": `quick-action-${action.label.toLowerCase().replace(/\s+/g, "-")}`,
            className: `flex flex-col items-center justify-center gap-2 p-3 rounded-xl ${action.bg} ${action.color} transition-smooth cursor-pointer border border-border/40`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { size: 22 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground text-center leading-tight", children: action.label })
            ]
          }
        )
      },
      action.to
    )) })
  ] });
}
const MILESTONES = [
  {
    days: 7,
    label: "7-Day Streak",
    icon: "🌱",
    color: "border-chart-3/40 bg-chart-3/10",
    glow: "shadow-[0_0_16px_rgba(0,200,150,0.35)]"
  },
  {
    days: 30,
    label: "30-Day Streak",
    icon: "🔥",
    color: "border-chart-1/40 bg-chart-1/10",
    glow: "shadow-[0_0_20px_rgba(240,140,30,0.4)]"
  },
  {
    days: 100,
    label: "100-Day Streak",
    icon: "⭐",
    color: "border-chart-5/40 bg-chart-5/10",
    glow: "shadow-[0_0_24px_rgba(160,100,240,0.45)]"
  }
];
function StreakRewards({ longestStreak }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 18, className: "text-chart-1" }),
      "Streak Milestones"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: MILESTONES.map((m, i) => {
      const achieved = longestStreak >= m.days;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.88 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4, delay: 0.15 + i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-xl border p-4 text-center transition-smooth ${achieved ? `${m.color} ${m.glow}` : "border-border/40 bg-muted/40 opacity-50 grayscale"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-1", children: m.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: m.label }),
                achieved && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-1 text-[10px] bg-primary/20 text-primary border-0 px-2", children: "Achieved!" })
              ]
            }
          )
        },
        m.days
      );
    }) })
  ] });
}
function RecentActivity({ entries }) {
  if (entries.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "recent-activity-empty",
        className: "text-center py-6 text-muted-foreground text-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 28, className: "mx-auto mb-2 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No recent activity yet. Start logging your first mood!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/mood",
              className: "text-primary text-sm font-medium mt-1 inline-block hover:underline",
              children: "Log your mood →"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: entries.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.li,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.35, delay: i * 0.08 },
      "data-ocid": `recent-activity-item-${i}`,
      className: "flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/40",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: e.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
            "Mood logged — score ",
            Number(e.score),
            "/10"
          ] }),
          e.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: e.note })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: formatRelativeDate(e.date) })
      ]
    },
    e.id.toString()
  )) });
}
function Dashboard() {
  const profile = useAppStore((s) => s.profile);
  const { isAuthenticated } = useAuth();
  const { data: todayMoods = [], isLoading: moodLoading } = useTodayMood();
  const { data: habitsData, isLoading: habitsLoading } = useTodayHabits();
  const { data: activeGoals = [], isLoading: goalsLoading } = useActiveGoals();
  const { data: recentActivity = [], isLoading: activityLoading } = useRecentActivity();
  const greeting = getGreeting();
  const displayName = profile ? `${profile.userId.toText().slice(0, 8)}…` : "friend";
  const todayMood = todayMoods.length > 0 ? todayMoods[todayMoods.length - 1] : null;
  const habits = (habitsData == null ? void 0 : habitsData.habits) ?? [];
  const completions = (habitsData == null ? void 0 : habitsData.completions) ?? [];
  const doneToday = completions.filter((c) => c.completed).length;
  const totalHabits = habits.length;
  const longestStreakDays = completions.reduce((acc, c) => {
    return c.completed ? acc + 1 : acc;
  }, 0);
  const statsLoading = moodLoading || habitsLoading || goalsLoading;
  if (!isAuthenticated) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7 pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-foreground", children: [
            greeting,
            ", ",
            displayName,
            " 👋"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AffirmationCard, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "Today at a Glance" }),
      statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
          "data-ocid": "quick-stats",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: SmilePlus,
                label: "Today's Mood",
                value: todayMood ? `${todayMood.emoji} Score ${Number(todayMood.score)}` : "Not logged",
                sub: todayMood ? "Logged today" : "Tap to log",
                delay: 0.05,
                color: "bg-chart-1/15 text-chart-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Flame,
                label: "Habits Done",
                value: totalHabits > 0 ? `${doneToday} / ${totalHabits}` : "No habits",
                sub: totalHabits > 0 ? doneToday === totalHabits ? "All done! 🎉" : `${totalHabits - doneToday} remaining` : "Add a habit",
                delay: 0.1,
                color: "bg-primary/15 text-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Trophy,
                label: "Streak Today",
                value: longestStreakDays > 0 ? `${longestStreakDays} habits` : "0",
                sub: "Completed today",
                delay: 0.15,
                color: "bg-chart-5/15 text-chart-5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Target,
                label: "Active Goals",
                value: goalsLoading ? "…" : String(activeGoals.length),
                sub: activeGoals.length === 1 ? "1 goal in progress" : `${activeGoals.length} goals in progress`,
                delay: 0.2,
                color: "bg-chart-2/15 text-chart-2"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QuickActions, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StreakRewards, { longestStreak: longestStreakDays }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "Recent Activity" }),
      activityLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RecentActivity, { entries: recentActivity })
    ] })
  ] });
}
export {
  Dashboard as default
};
