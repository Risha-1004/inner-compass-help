import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ExternalLink,
  Globe,
  Heart,
  MessageSquare,
  Phone,
  Shield,
  Wrench,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const crisisLines = [
  {
    name: "International Association for Suicide Prevention",
    description: "Global directory of crisis centres around the world.",
    link: "https://www.iasp.info/resources/Crisis_Centres/",
    label: "Find a centre",
  },
  {
    name: "988 Suicide & Crisis Lifeline (USA)",
    description: "Call or text 988. Free, confidential support 24/7.",
    phone: "988",
    link: "https://988lifeline.org",
    label: "Visit site",
  },
  {
    name: "Crisis Text Line (USA)",
    description: "Text HOME to 741741 to reach a trained crisis counselor.",
    phone: "Text HOME to 741741",
    link: "https://www.crisistextline.org",
    label: "Visit site",
  },
  {
    name: "Samaritans (UK)",
    description: "Free listening support any time — 116 123, day or night.",
    phone: "116 123",
    link: "https://www.samaritans.org",
    label: "Visit site",
  },
  {
    name: "Crisis Services Canada",
    description: "National distress and crisis line — 1-833-456-4566.",
    phone: "1-833-456-4566",
    link: "https://www.crisisservicescanada.ca",
    label: "Visit site",
  },
  {
    name: "Lifeline (Australia)",
    description: "24/7 crisis support and suicide prevention — 13 11 14.",
    phone: "13 11 14",
    link: "https://www.lifeline.org.au",
    label: "Visit site",
  },
  {
    name: "iCall (India)",
    description: "Psychosocial helpline by TISS — 9152987821.",
    phone: "9152987821",
    link: "https://icallhelpline.org",
    label: "Visit site",
  },
  {
    name: "Befrienders Worldwide",
    description:
      "Global network of emotional support volunteers in 50+ countries.",
    link: "https://www.befrienders.org",
    label: "Find support",
  },
];

const mentalHealthSupport = [
  {
    name: "NAMI — National Alliance on Mental Illness",
    description:
      "USA's largest mental health organization — education, advocacy, and support groups.",
    link: "https://www.nami.org",
    label: "Visit NAMI",
  },
  {
    name: "Mind UK",
    description:
      "Mental health information and advice for people in England and Wales.",
    link: "https://www.mind.org.uk",
    label: "Visit Mind",
  },
  {
    name: "Mental Health America",
    description:
      "Screening tools, resources, and advocacy for mental health in the USA.",
    link: "https://www.mhanational.org",
    label: "Visit MHA",
  },
  {
    name: "WHO — Mental Health",
    description:
      "World Health Organization's comprehensive mental health resources and data.",
    link: "https://www.who.int/health-topics/mental-health",
    label: "Visit WHO",
  },
];

const selfCareTools = [
  {
    name: "Breathing Exercises",
    description: "Guided breathing patterns to reduce stress and anxiety.",
    to: "/breathing",
    emoji: "🌬️",
  },
  {
    name: "Mood Tracker",
    description: "Log how you're feeling and identify patterns over time.",
    to: "/mood",
    emoji: "🌡️",
  },
  {
    name: "Journaling",
    description: "Write freely or use gratitude prompts to reflect.",
    to: "/journal",
    emoji: "📓",
  },
  {
    name: "Safety Plan",
    description: "Build a personal plan for difficult moments.",
    to: "/safety",
    emoji: "🛡️",
  },
];

const wellnessResources = [
  {
    name: "Beyond Blue (Australia)",
    description:
      "Trusted information and support for anxiety, depression, and suicide.",
    link: "https://www.beyondblue.org.au",
    label: "Visit Beyond Blue",
  },
  {
    name: "Heads Up — Workplace Mental Health",
    description:
      "Tools for mentally healthy workplaces, from Beyond Blue and Mentally Healthy.",
    link: "https://www.headsup.org.au",
    label: "Visit Heads Up",
  },
  {
    name: "CAMH (Canada)",
    description:
      "Canada's largest mental health teaching hospital with extensive public resources.",
    link: "https://www.camh.ca",
    label: "Visit CAMH",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function ResourceCard({
  name,
  description,
  link,
  label,
  phone,
}: {
  name: string;
  description: string;
  link?: string;
  label?: string | null;
  phone?: string;
}) {
  return (
    <Card className="bg-card border-border shadow-soft hover:shadow-elevated transition-smooth">
      <CardContent className="pt-5 pb-4">
        <p className="font-medium text-foreground text-sm leading-snug mb-1">
          {name}
        </p>
        <p className="text-muted-foreground text-xs leading-relaxed mb-3">
          {description}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {phone && (
            <Badge
              variant="secondary"
              className="text-xs font-mono gap-1 cursor-default"
            >
              <Phone size={10} />
              {phone}
            </Badge>
          )}
          {link && label && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
              data-ocid="resource-link"
            >
              {label}
              <ExternalLink size={10} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Resources() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Resources & Support
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          You're not alone. Find help, tools, and support below.
        </p>
      </div>

      {/* Emergency banner */}
      <div
        className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3"
        role="alert"
        data-ocid="emergency-banner"
      >
        <Shield size={18} className="text-destructive flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground leading-relaxed">
          <span className="font-semibold">
            If you are in immediate danger, please call emergency services.
          </span>{" "}
          In the USA dial <span className="font-mono font-semibold">911</span>,
          in the UK <span className="font-mono font-semibold">999</span>, or
          internationally <span className="font-mono font-semibold">112</span>.
        </p>
      </div>

      {/* Section 1 — Crisis Lines */}
      <section data-ocid="section-crisis">
        <SectionHeader
          icon={<Phone size={18} />}
          title="Crisis Lines"
          description="Free, confidential call and text support — available 24/7 in many regions."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {crisisLines.map((r) => (
            <ResourceCard key={r.name} {...r} />
          ))}
        </div>
      </section>

      {/* Section 2 — Mental Health Support */}
      <section data-ocid="section-mental-health">
        <SectionHeader
          icon={<Heart size={18} />}
          title="Mental Health Support"
          description="Trusted organizations providing education, advocacy, and professional guidance."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mentalHealthSupport.map((r) => (
            <ResourceCard key={r.name} {...r} />
          ))}
        </div>
      </section>

      {/* Section 3 — Self-Care Tools */}
      <section data-ocid="section-self-care">
        <SectionHeader
          icon={<Wrench size={18} />}
          title="Self-Care Tools"
          description="Built-in tools to support your daily wellbeing — right here in the app."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selfCareTools.map((tool) => (
            <Card
              key={tool.name}
              className="bg-card border-border shadow-soft hover:shadow-elevated transition-smooth"
            >
              <CardContent className="pt-5 pb-4 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">
                  {tool.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground text-sm leading-snug mb-1">
                    {tool.name}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                    {tool.description}
                  </p>
                  <Link
                    to={tool.to}
                    className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                    data-ocid="self-care-link"
                  >
                    Open tool
                    <MessageSquare size={10} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 4 — Wellness Resources */}
      <section data-ocid="section-wellness" className="pb-2">
        <SectionHeader
          icon={<Globe size={18} />}
          title="Wellness Resources"
          description="Additional organizations offering support for long-term mental health and workplace wellbeing."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {wellnessResources.map((r) => (
            <ResourceCard key={r.name} {...r} />
          ))}
        </div>
      </section>
    </div>
  );
}
