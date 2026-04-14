import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { JournalEntry } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Edit2,
  Heart,
  PenLine,
  Plus,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Backend hooks ────────────────────────────────────────────────────────────

function useBackendActor() {
  return useActor(createActor);
}

function useJournalEntries(entryType: "regular" | "gratitude") {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery<JournalEntry[]>({
    queryKey: ["journalEntries", entryType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJournalEntries(entryType) as Promise<JournalEntry[]>;
    },
    enabled: !!actor && !actorFetching,
  });
}

function useCreateJournalEntry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      content,
      entryType,
      tags,
    }: {
      title: string;
      content: string;
      entryType: "regular" | "gratitude";
      tags: string[];
    }) => {
      if (!actor) throw new Error("Actor not available");
      const today = new Date().toISOString().split("T")[0];
      const result = await actor.createJournalEntry(
        today,
        title,
        content,
        entryType,
        tags,
      );
      if (result.__kind__ === "err") throw new Error("Failed to create entry");
      return result.ok;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["journalEntries", vars.entryType] });
      toast.success("Entry saved ✨");
    },
    onError: () => toast.error("Failed to save entry"),
  });
}

function useUpdateJournalEntry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      title,
      content,
      tags,
    }: {
      id: bigint;
      title: string;
      content: string;
      tags: string[];
      entryType: "regular" | "gratitude";
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.updateJournalEntry(id, title, content, tags);
      if (result.__kind__ === "err") throw new Error("Failed to update entry");
      return result.ok;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["journalEntries", vars.entryType] });
      toast.success("Entry updated");
    },
    onError: () => toast.error("Failed to update entry"),
  });
}

function useDeleteJournalEntry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
    }: { id: bigint; entryType: "regular" | "gratitude" }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteJournalEntry(id);
      if (result.__kind__ === "err") throw new Error("Failed to delete entry");
      return result.ok;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["journalEntries", vars.entryType] });
      toast.success("Entry deleted");
    },
    onError: () => toast.error("Failed to delete entry"),
  });
}

// ─── Tag Chip Input ───────────────────────────────────────────────────────────

function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const parts = raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const next = [...tags, ...parts].filter((t, i, a) => a.indexOf(t) === i);
    onChange(next);
    setInput("");
  };

  const removeTag = (tag: string) => onChange(tags.filter((t) => t !== tag));

  return (
    <div
      className="flex flex-wrap gap-1.5 min-h-[42px] px-3 py-2 rounded-md border border-input bg-card cursor-text"
      onClick={() => inputRef.current?.focus()}
      onKeyDown={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground border border-accent/30"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(tag);
            }}
            className="hover:text-destructive transition-colors"
            aria-label={`Remove tag ${tag}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (input.trim()) addTag(input);
          } else if (e.key === "Backspace" && !input && tags.length) {
            removeTag(tags[tags.length - 1]);
          }
        }}
        onBlur={() => {
          if (input.trim()) addTag(input);
        }}
        placeholder={tags.length ? "" : "Add tags (press Enter or comma)"}
        className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
        aria-label="Tags input"
      />
    </div>
  );
}

// ─── Write Panel ──────────────────────────────────────────────────────────────

interface WritePanelProps {
  activeTab: "regular" | "gratitude";
  onClose: () => void;
  editEntry?: JournalEntry;
}

function WritePanel({ activeTab, onClose, editEntry }: WritePanelProps) {
  const [title, setTitle] = useState(editEntry?.title ?? "");
  const [content, setContent] = useState(editEntry?.content ?? "");
  const [tags, setTags] = useState<string[]>(editEntry?.tags ?? []);
  const createEntry = useCreateJournalEntry();
  const updateEntry = useUpdateJournalEntry();

  const isEdit = !!editEntry;
  const isBusy = createEntry.isPending || updateEntry.isPending;

  const isGratitude = activeTab === "gratitude";

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.warning("Please fill in the title and content");
      return;
    }
    if (isEdit) {
      await updateEntry.mutateAsync({
        id: editEntry.id,
        title,
        content,
        tags,
        entryType: activeTab,
      });
    } else {
      await createEntry.mutateAsync({
        title,
        content,
        entryType: activeTab,
        tags,
      });
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={`rounded-2xl border shadow-elevated overflow-hidden mb-6 ${
        isGratitude ? "bg-card border-amber-200/40" : "bg-card border-border"
      }`}
      data-ocid="journal-write-panel"
    >
      {/* Panel header */}
      <div
        className={`px-5 py-3.5 flex items-center justify-between border-b ${
          isGratitude
            ? "bg-amber-50/60 border-amber-200/30"
            : "bg-muted/30 border-border"
        }`}
      >
        <div className="flex items-center gap-2">
          {isGratitude ? (
            <Heart className="w-4 h-4 text-amber-500" />
          ) : (
            <PenLine className="w-4 h-4 text-primary" />
          )}
          <span className="font-display font-semibold text-sm text-foreground">
            {isEdit
              ? "Edit entry"
              : isGratitude
                ? "New gratitude entry"
                : "New journal entry"}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
          aria-label="Close write panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Form */}
      <div className="p-5 space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="entry-title"
            className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
          >
            Title
          </Label>
          <Input
            id="entry-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              isGratitude ? "Today I'm grateful for…" : "What's on your mind?"
            }
            className="text-base font-display font-medium"
            data-ocid="journal-title-input"
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="entry-content"
            className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
          >
            {isGratitude ? "What are you thankful for?" : "Your thoughts"}
          </Label>
          <Textarea
            id="entry-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              isGratitude
                ? "Write about the moments, people, and things that brought you joy…"
                : "Let your thoughts flow freely. There's no right or wrong here…"
            }
            className="min-h-[200px] resize-y text-sm leading-relaxed"
            data-ocid="journal-content-input"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
            <Tag className="w-3 h-3" /> Tags
          </Label>
          <TagInput tags={tags} onChange={setTags} />
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isBusy}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={isBusy}
            data-ocid="journal-save-btn"
            className={
              isGratitude
                ? "bg-amber-500 hover:bg-amber-600 text-white border-0"
                : ""
            }
          >
            {isBusy ? "Saving…" : isEdit ? "Save changes" : "Save entry"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Entry Card ───────────────────────────────────────────────────────────────

interface EntryCardProps {
  entry: JournalEntry;
  activeTab: "regular" | "gratitude";
  onEdit: (entry: JournalEntry) => void;
}

function EntryCard({ entry, activeTab, onEdit }: EntryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deleteEntry = useDeleteJournalEntry();

  const isGratitude = activeTab === "gratitude";
  const preview =
    entry.content.slice(0, 100) + (entry.content.length > 100 ? "…" : "");

  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3500);
    } else {
      deleteEntry.mutate({ id: entry.id, entryType: activeTab });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card
        className={`shadow-soft hover:shadow-elevated transition-shadow duration-200 overflow-hidden border ${
          isGratitude ? "border-amber-200/40" : "border-border"
        }`}
        data-ocid="journal-entry-card"
      >
        <CardContent className="p-0">
          {/* Card top bar */}
          <button
            type="button"
            className="w-full px-5 pt-4 pb-3 flex items-start justify-between gap-3 cursor-pointer text-left"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">
                  {formattedDate}
                </span>
                {isGratitude && (
                  <Heart className="w-3 h-3 text-amber-400 fill-amber-400" />
                )}
              </div>
              <h3 className="font-display font-semibold text-base text-foreground truncate">
                {entry.title}
              </h3>
            </div>
            <span className="shrink-0 text-muted-foreground mt-0.5">
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </span>
          </button>

          {/* Preview / Full content */}
          <div className="px-5 pb-2">
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  key="full"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="preview"
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {preview}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Tags + actions */}
          <div className="px-5 pb-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`text-xs px-2 py-0.5 ${
                    isGratitude
                      ? "bg-amber-100/60 text-amber-800 border-amber-200/40"
                      : ""
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => onEdit(entry)}
                aria-label="Edit entry"
                data-ocid="journal-edit-btn"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-7 px-2 text-xs transition-all ${
                  confirmDelete
                    ? "text-destructive bg-destructive/10 hover:bg-destructive/20"
                    : "text-muted-foreground hover:text-destructive"
                }`}
                onClick={handleDelete}
                disabled={deleteEntry.isPending}
                aria-label={confirmDelete ? "Confirm delete" : "Delete entry"}
                data-ocid="journal-delete-btn"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                {confirmDelete ? "Confirm?" : ""}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({
  type,
  onNew,
}: {
  type: "regular" | "gratitude";
  onNew: () => void;
}) {
  const isGratitude = type === "gratitude";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      data-ocid="journal-empty-state"
    >
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${
          isGratitude ? "bg-amber-100/70" : "bg-primary/10"
        }`}
      >
        {isGratitude ? (
          <Heart className="w-8 h-8 text-amber-500" />
        ) : (
          <BookOpen className="w-8 h-8 text-primary" />
        )}
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
        {isGratitude ? "Begin your gratitude practice" : "Your journal awaits"}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6 leading-relaxed">
        {isGratitude
          ? "Start your gratitude practice — what are you thankful for today?"
          : "Your journal is empty — what's on your mind today?"}
      </p>
      <Button
        onClick={onNew}
        data-ocid="journal-empty-cta"
        className={
          isGratitude
            ? "bg-amber-500 hover:bg-amber-600 text-white border-0"
            : ""
        }
      >
        <Plus className="w-4 h-4 mr-2" />
        {isGratitude ? "Write your first gratitude" : "Write your first entry"}
      </Button>
    </motion.div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function EntriesSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="shadow-soft">
          <CardContent className="p-5 space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Journal() {
  const [activeTab, setActiveTab] = useState<"regular" | "gratitude">(
    "regular",
  );
  const [showWritePanel, setShowWritePanel] = useState(false);
  const [editEntry, setEditEntry] = useState<JournalEntry | undefined>(
    undefined,
  );

  const { data: entries = [], isLoading } = useJournalEntries(activeTab);

  const isGratitude = activeTab === "gratitude";

  const openNew = () => {
    setEditEntry(undefined);
    setShowWritePanel(true);
  };

  const openEdit = (entry: JournalEntry) => {
    setEditEntry(entry);
    setShowWritePanel(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closePanel = () => {
    setShowWritePanel(false);
    setEditEntry(undefined);
  };

  const prevTabRef = useRef(activeTab);
  if (prevTabRef.current !== activeTab) {
    prevTabRef.current = activeTab;
    closePanel();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground leading-tight">
            {isGratitude ? "Gratitude Journal" : "My Journal"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isGratitude
              ? "Cultivate joy by noticing what you're grateful for"
              : "A private space for your thoughts, feelings, and reflections"}
          </p>
        </div>
        <Button
          onClick={openNew}
          data-ocid="journal-new-btn"
          className={`transition-smooth ${
            isGratitude
              ? "bg-amber-500 hover:bg-amber-600 text-white border-0"
              : ""
          }`}
        >
          <Plus className="w-4 h-4 mr-2" />
          New entry
        </Button>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl bg-muted/40 border border-border w-fit"
        role="tablist"
        aria-label="Journal type"
        data-ocid="journal-tabs"
      >
        {(["regular", "gratitude"] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
              activeTab === tab
                ? tab === "gratitude"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid={`journal-tab-${tab}`}
          >
            {tab === "gratitude" ? (
              <Heart className="w-3.5 h-3.5" />
            ) : (
              <BookOpen className="w-3.5 h-3.5" />
            )}
            {tab === "regular" ? "Journal" : "Gratitude"}
          </button>
        ))}
      </div>

      {/* Write panel */}
      <AnimatePresence>
        {showWritePanel && (
          <WritePanel
            key="write-panel"
            activeTab={activeTab}
            onClose={closePanel}
            editEntry={editEntry}
          />
        )}
      </AnimatePresence>

      {/* Entries list */}
      {isLoading ? (
        <EntriesSkeleton />
      ) : entries.length === 0 ? (
        <EmptyState type={activeTab} onNew={openNew} />
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="space-y-3" data-ocid="journal-entries-list">
            {entries
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
              .map((entry) => (
                <EntryCard
                  key={String(entry.id)}
                  entry={entry}
                  activeTab={activeTab}
                  onEdit={openEdit}
                />
              ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
