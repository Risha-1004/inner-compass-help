import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Wind } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Resource {
  title: string;
  description: string;
  url: string;
  tag: string;
  internal?: boolean;
  icon: string;
}

interface Section {
  heading: string;
  subtitle: string;
  emoji: string;
  resources: Resource[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
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
        icon: "🟠",
      },
      {
        title: "Insight Timer",
        description: "Free meditations from world-class teachers",
        url: "https://insighttimer.com",
        tag: "Free",
        icon: "🔔",
      },
      {
        title: "Calm",
        description: "Sleep, meditation, and relaxation",
        url: "https://calm.com",
        tag: "Sleep",
        icon: "🌙",
      },
      {
        title: "UCLA Mindful",
        description: "Free guided meditations from UCLA Health",
        url: "https://uclahealth.org/programs/marc",
        tag: "Free",
        icon: "🎓",
      },
    ],
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
        icon: "▶️",
      },
      {
        title: "Down Dog App",
        description: "Personalized yoga practice tailored to you",
        url: "https://downdogapp.com",
        tag: "Personalized",
        icon: "🐕",
      },
      {
        title: "Do Yoga With Me",
        description: "Free online yoga classes for every style",
        url: "https://doyogawithme.com",
        tag: "Free",
        icon: "🌸",
      },
    ],
  },
  {
    heading: "Breathing & Relaxation",
    subtitle: "One breath at a time. Your nervous system will thank you.",
    emoji: "💨",
    resources: [
      {
        title: "Box Breathing Guide",
        description:
          "Try our built-in guided breathing exercises — right here on Inner Compass",
        url: "/breathing",
        tag: "Built-in",
        internal: true,
        icon: "◻️",
      },
      {
        title: "The Breathing App",
        description:
          "Guided breathing sessions based on heart rate variability",
        url: "https://thebreathingapp.com",
        tag: "Guided",
        icon: "🌬️",
      },
    ],
  },
];

// ─── Resource card ────────────────────────────────────────────────────────────
function ResourceCard({ resource }: { resource: Resource }) {
  const content = (
    <div className="group bg-card border border-border rounded-2xl p-5 shadow-soft transition-smooth hover:shadow-elevated hover:border-primary/30 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center text-xl flex-shrink-0">
            {resource.icon}
          </div>
          <div className="min-w-0">
            <div className="font-display font-semibold text-foreground text-sm leading-snug">
              {resource.title}
            </div>
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 mt-0.5 font-normal"
            >
              {resource.tag}
            </Badge>
          </div>
        </div>
        <div className="text-primary/50 group-hover:text-primary transition-smooth flex-shrink-0 mt-0.5">
          {resource.internal ? <Wind size={14} /> : <ExternalLink size={14} />}
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">
        {resource.description}
      </p>
    </div>
  );

  if (resource.internal) {
    return (
      <Link to={resource.url as "/breathing"} className="block">
        {content}
      </Link>
    );
  }

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      data-ocid={`resource-${resource.title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {content}
    </a>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
function WellnessSection({ section }: { section: Section }) {
  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
          {section.emoji}
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground leading-none">
            {section.heading}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {section.subtitle}
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {section.resources.map((r) => (
          <ResourceCard key={r.title} resource={r} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Wellness() {
  return (
    <div className="space-y-10 pb-10">
      {/* Page header */}
      <div className="bg-gradient-to-br from-primary/8 via-accent/5 to-transparent border border-border rounded-2xl p-8">
        <div className="max-w-xl">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
            Wellness Library
          </p>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">
            Meditation & Yoga Resources
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            A curated collection of trusted tools for your mind, body, and
            breath. Everything here is free or beginner-friendly — no experience
            required.
          </p>
        </div>
      </div>

      {/* Divider + section list */}
      <div className="space-y-12">
        {SECTIONS.map((section, i) => (
          <div key={section.heading}>
            <WellnessSection section={section} />
            {i < SECTIONS.length - 1 && (
              <div className="mt-10 border-t border-border/50" />
            )}
          </div>
        ))}
      </div>

      {/* Footer nudge */}
      <div className="bg-muted/30 border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xl">
          💛
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            Start with one thing
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            You don't need to try everything at once. Pick one practice and
            return to it daily — even for five minutes.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex-shrink-0"
          asChild
          data-ocid="btn-start-breathing"
        >
          <Link to="/breathing">Try a breathing session</Link>
        </Button>
      </div>
    </div>
  );
}
