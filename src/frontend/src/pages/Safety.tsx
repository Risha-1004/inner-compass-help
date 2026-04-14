import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { ProfessionalContact, SafetyPlan, SupportContact } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ExternalLink,
  Heart,
  Plus,
  Shield,
  Trash2,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Crisis Resources ─────────────────────────────────────────────────────────
function CrisisBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-5"
      data-ocid="crisis-resources-box"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive"
          aria-hidden
        />
        <div className="space-y-2">
          <p className="font-display text-base font-semibold text-destructive">
            If you're in immediate danger
          </p>
          <p className="text-sm text-foreground/80">
            Call emergency services: <strong>911</strong> (US) ·{" "}
            <strong>999</strong> (UK) · <strong>112</strong> (EU/International)
          </p>
          <p className="text-sm text-foreground/80">
            Crisis Text Line: Text <strong>HOME</strong> to{" "}
            <strong>741741</strong>
          </p>
          <a
            href="https://www.iasp.info/resources/Crisis_Centres/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary underline underline-offset-2 hover:opacity-80 transition-smooth"
          >
            International Crisis Centre Directory (IASP)
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── List section (reasons, warning signs, coping) ────────────────────────────
interface StringListSectionProps {
  title: string;
  description: string;
  items: string[];
  placeholder: string;
  onAdd: (v: string) => void;
  onRemove: (i: number) => void;
  ocid: string;
}

function StringListSection({
  title,
  description,
  items,
  placeholder,
  onAdd,
  onRemove,
  ocid,
}: StringListSectionProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const v = input.trim();
    if (!v) return;
    onAdd(v);
    setInput("");
  };

  return (
    <div className="space-y-3" data-ocid={ocid}>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-1"
          aria-label={`Add to ${title}`}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleAdd}
          aria-label="Add item"
          data-ocid={`${ocid}-add`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={`item-${i}-${item.slice(0, 8)}`}
              className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2"
            >
              <span className="text-sm text-foreground min-w-0 break-words">
                {item}
              </span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={`Remove "${item}"`}
                className="text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Contact list section ─────────────────────────────────────────────────────
interface SupportContactsSectionProps {
  title: string;
  contacts: SupportContact[];
  onAdd: (c: SupportContact) => void;
  onRemove: (i: number) => void;
}

function SupportContactsSection({
  title,
  contacts,
  onAdd,
  onRemove,
}: SupportContactsSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !phone.trim()) return;
    onAdd({
      name: name.trim(),
      phone: phone.trim(),
      relation: relation.trim(),
    });
    setName("");
    setPhone("");
    setRelation("");
  };

  return (
    <div className="space-y-3" data-ocid="support-contacts-section">
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">
          People you trust to reach out to
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          aria-label="Contact name"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          aria-label="Phone number"
        />
        <Input
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          placeholder="Relationship (e.g. Best friend)"
          aria-label="Relationship"
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleAdd}
        data-ocid="support-contact-add"
      >
        <Plus className="h-4 w-4 mr-1" /> Add contact
      </Button>
      {contacts.length > 0 && (
        <ul className="space-y-2">
          {contacts.map((c, i) => (
            <li
              key={`support-${c.name}-${i}`}
              className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2"
            >
              <div className="min-w-0">
                <span className="text-sm font-medium text-foreground">
                  {c.name}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {c.phone}
                </span>
                {c.relation && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {c.relation}
                  </Badge>
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={`Remove ${c.name}`}
                className="text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface ProfessionalContactsSectionProps {
  contacts: ProfessionalContact[];
  onAdd: (c: ProfessionalContact) => void;
  onRemove: (i: number) => void;
}

function ProfessionalContactsSection({
  contacts,
  onAdd,
  onRemove,
}: ProfessionalContactsSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !phone.trim()) return;
    onAdd({ name: name.trim(), phone: phone.trim(), role: role.trim() });
    setName("");
    setPhone("");
    setRole("");
  };

  return (
    <div className="space-y-3" data-ocid="professional-contacts-section">
      <div>
        <p className="font-semibold text-foreground">Professional Support</p>
        <p className="text-sm text-muted-foreground">
          Therapists, doctors, or counselors
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          aria-label="Professional name"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          aria-label="Phone number"
        />
        <Input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role (e.g. Therapist)"
          aria-label="Role"
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleAdd}
        data-ocid="professional-contact-add"
      >
        <Plus className="h-4 w-4 mr-1" /> Add professional
      </Button>
      {contacts.length > 0 && (
        <ul className="space-y-2">
          {contacts.map((c, i) => (
            <li
              key={`prof-${c.name}-${i}`}
              className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2"
            >
              <div className="min-w-0">
                <span className="text-sm font-medium text-foreground">
                  {c.name}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {c.phone}
                </span>
                {c.role && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {c.role}
                  </Badge>
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={`Remove ${c.name}`}
                className="text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Safety() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data: plan, isLoading } = useQuery<SafetyPlan | null>({
    queryKey: ["safetyPlan"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSafetyPlan();
    },
    enabled: !!actor && !isFetching,
  });

  // Local form state
  const [reasonsToLive, setReasonsToLive] = useState<string[]>([]);
  const [warningSigns, setWarningSigns] = useState<string[]>([]);
  const [copingStrategies, setCopingStrategies] = useState<string[]>([]);
  const [supportContacts, setSupportContacts] = useState<SupportContact[]>([]);
  const [professionalContacts, setProfessionalContacts] = useState<
    ProfessionalContact[]
  >([]);
  const [safeEnvironmentNotes, setSafeEnvironmentNotes] = useState("");

  // Sync form with loaded plan
  useEffect(() => {
    if (plan) {
      setReasonsToLive(plan.reasonsToLive);
      setWarningSigns(plan.warningSigns);
      setCopingStrategies(plan.copingStrategies);
      setSupportContacts(plan.supportContacts);
      setProfessionalContacts(plan.professionalContacts);
      setSafeEnvironmentNotes(plan.safeEnvironmentNotes);
    }
  }, [plan]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.upsertSafetyPlan(
        reasonsToLive,
        warningSigns,
        copingStrategies,
        supportContacts,
        professionalContacts,
        safeEnvironmentNotes,
      );
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        queryClient.invalidateQueries({ queryKey: ["safetyPlan"] });
        toast.success("Your safety plan has been saved privately.");
      } else {
        toast.error("Could not save your plan. Please try again.");
      }
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSafetyPlan();
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        queryClient.invalidateQueries({ queryKey: ["safetyPlan"] });
        setReasonsToLive([]);
        setWarningSigns([]);
        setCopingStrategies([]);
        setSupportContacts([]);
        setProfessionalContacts([]);
        setSafeEnvironmentNotes("");
        setConfirmDelete(false);
        toast.success("Your safety plan has been deleted.");
      }
    },
    onError: () => toast.error("Could not delete. Please try again."),
  });

  const removeFrom = <T,>(arr: T[], i: number): T[] => [
    ...arr.slice(0, i),
    ...arr.slice(i + 1),
  ];

  if (isLoading) {
    return (
      <div className="space-y-4 p-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10" data-ocid="safety-page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">
            Safety Plan
          </h1>
        </div>
        <p className="text-muted-foreground max-w-xl">
          Your personal safety plan is a private tool to help you through
          difficult times.{" "}
          <span className="font-medium text-foreground">
            Only you can see this.
          </span>
        </p>
      </motion.div>

      {/* Crisis box — always visible */}
      <CrisisBox />

      {/* Plan form */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Your Safety Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <StringListSection
              title="Why I Want to Stay"
              description="Reasons to live — people, places, hopes, things that matter to you"
              items={reasonsToLive}
              placeholder="Add a reason that matters to you..."
              onAdd={(v) => setReasonsToLive([...reasonsToLive, v])}
              onRemove={(i) => setReasonsToLive(removeFrom(reasonsToLive, i))}
              ocid="reasons-to-live"
            />

            <div className="border-t border-border/60" />

            <StringListSection
              title="Warning Signs"
              description="Signs that tell you you're in crisis — thoughts, feelings, behaviors"
              items={warningSigns}
              placeholder="e.g. I start withdrawing from friends..."
              onAdd={(v) => setWarningSigns([...warningSigns, v])}
              onRemove={(i) => setWarningSigns(removeFrom(warningSigns, i))}
              ocid="warning-signs"
            />

            <div className="border-t border-border/60" />

            <StringListSection
              title="Coping Strategies"
              description="Things you can do when you feel overwhelmed — activities, thoughts, practices"
              items={copingStrategies}
              placeholder="e.g. Take a walk, call a friend, journal..."
              onAdd={(v) => setCopingStrategies([...copingStrategies, v])}
              onRemove={(i) =>
                setCopingStrategies(removeFrom(copingStrategies, i))
              }
              ocid="coping-strategies"
            />

            <div className="border-t border-border/60" />

            <SupportContactsSection
              title="People I Can Call"
              contacts={supportContacts}
              onAdd={(c) => setSupportContacts([...supportContacts, c])}
              onRemove={(i) =>
                setSupportContacts(removeFrom(supportContacts, i))
              }
            />

            <div className="border-t border-border/60" />

            <ProfessionalContactsSection
              contacts={professionalContacts}
              onAdd={(c) =>
                setProfessionalContacts([...professionalContacts, c])
              }
              onRemove={(i) =>
                setProfessionalContacts(removeFrom(professionalContacts, i))
              }
            />

            <div className="border-t border-border/60" />

            <div className="space-y-2" data-ocid="safe-environment-notes">
              <Label
                htmlFor="safe-env"
                className="font-semibold text-foreground"
              >
                My Safe Environment
              </Label>
              <p className="text-sm text-muted-foreground">
                Things you can do to make your surroundings safer
              </p>
              <Textarea
                id="safe-env"
                value={safeEnvironmentNotes}
                onChange={(e) => setSafeEnvironmentNotes(e.target.value)}
                placeholder="e.g. Remove items that could cause harm, stay with someone I trust..."
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
              <Button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="min-w-[140px]"
                data-ocid="save-safety-plan"
              >
                {saveMutation.isPending ? "Saving…" : "Save my plan"}
              </Button>

              {plan &&
                (confirmDelete ? (
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-destructive font-medium">
                      Are you sure? This cannot be undone.
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate()}
                      disabled={deleteMutation.isPending}
                      data-ocid="confirm-delete-plan"
                    >
                      {deleteMutation.isPending ? "Deleting…" : "Yes, delete"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConfirmDelete(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => setConfirmDelete(true)}
                    data-ocid="delete-safety-plan"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete plan
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
