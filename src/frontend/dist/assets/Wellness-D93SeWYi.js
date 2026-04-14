import { j as jsxRuntimeExports, n as Button, L as Link, g as Badge, W as Wind } from "./index-Chdf2p0o.js";
import { E as ExternalLink } from "./external-link-D2RL2b53.js";
const SECTIONS = [
  {
    heading: "Meditation",
    subtitle: "Quiet the mind. Restore your centre.",
    emoji: "🧘",
    resources: [
      {
        title: "Headspace",
        description: "Guided meditation for beginners and beyond",
        url: "https://headspace.com",
        tag: "Guided",
        icon: "🟠"
      },
      {
        title: "Insight Timer",
        description: "Free meditations from world-class teachers",
        url: "https://insighttimer.com",
        tag: "Free",
        icon: "🔔"
      },
      {
        title: "Calm",
        description: "Sleep, meditation, and relaxation",
        url: "https://calm.com",
        tag: "Sleep",
        icon: "🌙"
      },
      {
        title: "UCLA Mindful",
        description: "Free guided meditations from UCLA Health",
        url: "https://uclahealth.org/programs/marc",
        tag: "Free",
        icon: "🎓"
      }
    ]
  },
  {
    heading: "Yoga",
    subtitle: "Move your body. Settle your spirit.",
    emoji: "🌿",
    resources: [
      {
        title: "Yoga With Adriene",
        description: "Free yoga for every body — all levels welcome",
        url: "https://youtube.com/yogawithadriene",
        tag: "Free",
        icon: "▶️"
      },
      {
        title: "Down Dog App",
        description: "Personalized yoga practice tailored to you",
        url: "https://downdogapp.com",
        tag: "Personalized",
        icon: "🐕"
      },
      {
        title: "Do Yoga With Me",
        description: "Free online yoga classes for every style",
        url: "https://doyogawithme.com",
        tag: "Free",
        icon: "🌸"
      }
    ]
  },
  {
    heading: "Breathing & Relaxation",
    subtitle: "One breath at a time. Your nervous system will thank you.",
    emoji: "💨",
    resources: [
      {
        title: "Box Breathing Guide",
        description: "Try our built-in guided breathing exercises — right here on Inner Compass",
        url: "/breathing",
        tag: "Built-in",
        internal: true,
        icon: "◻️"
      },
      {
        title: "The Breathing App",
        description: "Guided breathing sessions based on heart rate variability",
        url: "https://thebreathingapp.com",
        tag: "Guided",
        icon: "🌬️"
      }
    ]
  }
];
function ResourceCard({ resource }) {
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group bg-card border border-border rounded-2xl p-5 shadow-soft transition-smooth hover:shadow-elevated hover:border-primary/30 flex flex-col gap-3 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center text-xl flex-shrink-0", children: resource.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-foreground text-sm leading-snug", children: resource.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-[10px] px-1.5 py-0 mt-0.5 font-normal",
              children: resource.tag
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary/50 group-hover:text-primary transition-smooth flex-shrink-0 mt-0.5", children: resource.internal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed flex-1", children: resource.description })
  ] });
  if (resource.internal) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: resource.url, className: "block", children: content });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: resource.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "block",
      "data-ocid": `resource-${resource.title.toLowerCase().replace(/\s+/g, "-")}`,
      children: content
    }
  );
}
function WellnessSection({ section }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl", children: section.emoji }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground leading-none", children: section.heading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: section.subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: section.resources.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResourceCard, { resource: r }, r.title)) })
  ] });
}
function Wellness() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-primary/8 via-accent/5 to-transparent border border-border rounded-2xl p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-primary uppercase tracking-widest mb-2", children: "Wellness Library" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Meditation & Yoga Resources" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "A curated collection of trusted tools for your mind, body, and breath. Everything here is free or beginner-friendly — no experience required." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: SECTIONS.map((section, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(WellnessSection, { section }),
      i < SECTIONS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 border-t border-border/50" })
    ] }, section.heading)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xl", children: "💛" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Start with one thing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "You don't need to try everything at once. Pick one practice and return to it daily — even for five minutes." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "flex-shrink-0",
          asChild: true,
          "data-ocid": "btn-start-breathing",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/breathing", children: "Try a breathing session" })
        }
      )
    ] })
  ] });
}
export {
  Wellness as default
};
