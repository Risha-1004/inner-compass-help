import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, n as Button, H as Heart, B as BookOpen, b as useQuery, m as motion, X, C as Card, e as CardContent, S as Skeleton, g as Badge, h as useActor, o as useQueryClient, p as useMutation, q as ue, i as createActor } from "./index-Chdf2p0o.js";
import { I as Input } from "./input-Cu6OzIVX.js";
import { L as Label } from "./label-DSwR1ZcM.js";
import { T as Textarea } from "./textarea-DaWkEaNe.js";
import { P as Plus } from "./plus-BzfKwx4k.js";
import { A as AnimatePresence } from "./index-BBuRJ3Ez.js";
import { C as ChevronUp } from "./chevron-up-BNn2SrkE.js";
import { C as ChevronDown } from "./chevron-down-DS9A7rDy.js";
import { T as Trash2 } from "./trash-2-CFcnQdCp.js";
import "./index-BDOZE7B6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function useBackendActor() {
  return useActor(createActor);
}
function useJournalEntries(entryType) {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: ["journalEntries", entryType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJournalEntries(entryType);
    },
    enabled: !!actor && !actorFetching
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
      tags
    }) => {
      if (!actor) throw new Error("Actor not available");
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const result = await actor.createJournalEntry(
        today,
        title,
        content,
        entryType,
        tags
      );
      if (result.__kind__ === "err") throw new Error("Failed to create entry");
      return result.ok;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["journalEntries", vars.entryType] });
      ue.success("Entry saved ✨");
    },
    onError: () => ue.error("Failed to save entry")
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
      tags
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.updateJournalEntry(id, title, content, tags);
      if (result.__kind__ === "err") throw new Error("Failed to update entry");
      return result.ok;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["journalEntries", vars.entryType] });
      ue.success("Entry updated");
    },
    onError: () => ue.error("Failed to update entry")
  });
}
function useDeleteJournalEntry() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteJournalEntry(id);
      if (result.__kind__ === "err") throw new Error("Failed to delete entry");
      return result.ok;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["journalEntries", vars.entryType] });
      ue.success("Entry deleted");
    },
    onError: () => ue.error("Failed to delete entry")
  });
}
function TagInput({
  tags,
  onChange
}) {
  const [input, setInput] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const addTag = (raw) => {
    const parts = raw.split(",").map((t) => t.trim()).filter(Boolean);
    const next = [...tags, ...parts].filter((t, i, a) => a.indexOf(t) === i);
    onChange(next);
    setInput("");
  };
  const removeTag = (tag) => onChange(tags.filter((t) => t !== tag));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-wrap gap-1.5 min-h-[42px] px-3 py-2 rounded-md border border-input bg-card cursor-text",
      onClick: () => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.focus();
      },
      onKeyDown: () => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.focus();
      },
      children: [
        tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground border border-accent/30",
            children: [
              tag,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    removeTag(tag);
                  },
                  className: "hover:text-destructive transition-colors",
                  "aria-label": `Remove tag ${tag}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                }
              )
            ]
          },
          tag
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                if (input.trim()) addTag(input);
              } else if (e.key === "Backspace" && !input && tags.length) {
                removeTag(tags[tags.length - 1]);
              }
            },
            onBlur: () => {
              if (input.trim()) addTag(input);
            },
            placeholder: tags.length ? "" : "Add tags (press Enter or comma)",
            className: "flex-1 min-w-[120px] bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground",
            "aria-label": "Tags input"
          }
        )
      ]
    }
  );
}
function WritePanel({ activeTab, onClose, editEntry }) {
  const [title, setTitle] = reactExports.useState((editEntry == null ? void 0 : editEntry.title) ?? "");
  const [content, setContent] = reactExports.useState((editEntry == null ? void 0 : editEntry.content) ?? "");
  const [tags, setTags] = reactExports.useState((editEntry == null ? void 0 : editEntry.tags) ?? []);
  const createEntry = useCreateJournalEntry();
  const updateEntry = useUpdateJournalEntry();
  const isEdit = !!editEntry;
  const isBusy = createEntry.isPending || updateEntry.isPending;
  const isGratitude = activeTab === "gratitude";
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      ue.warning("Please fill in the title and content");
      return;
    }
    if (isEdit) {
      await updateEntry.mutateAsync({
        id: editEntry.id,
        title,
        content,
        tags,
        entryType: activeTab
      });
    } else {
      await createEntry.mutateAsync({
        title,
        content,
        entryType: activeTab,
        tags
      });
    }
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      className: `rounded-2xl border shadow-elevated overflow-hidden mb-6 ${isGratitude ? "bg-card border-amber-200/40" : "bg-card border-border"}`,
      "data-ocid": "journal-write-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `px-5 py-3.5 flex items-center justify-between border-b ${isGratitude ? "bg-amber-50/60 border-amber-200/30" : "bg-muted/30 border-border"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                isGratitude ? /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-amber-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: isEdit ? "Edit entry" : isGratitude ? "New gratitude entry" : "New journal entry" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted",
                  "aria-label": "Close write panel",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "entry-title",
                className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                children: "Title"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "entry-title",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: isGratitude ? "Today I'm grateful for…" : "What's on your mind?",
                className: "text-base font-display font-medium",
                "data-ocid": "journal-title-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "entry-content",
                className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                children: isGratitude ? "What are you thankful for?" : "Your thoughts"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "entry-content",
                value: content,
                onChange: (e) => setContent(e.target.value),
                placeholder: isGratitude ? "Write about the moments, people, and things that brought you joy…" : "Let your thoughts flow freely. There's no right or wrong here…",
                className: "min-h-[200px] resize-y text-sm leading-relaxed",
                "data-ocid": "journal-content-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
              " Tags"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TagInput, { tags, onChange: setTags })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: onClose,
                disabled: isBusy,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick: handleSubmit,
                disabled: isBusy,
                "data-ocid": "journal-save-btn",
                className: isGratitude ? "bg-amber-500 hover:bg-amber-600 text-white border-0" : "",
                children: isBusy ? "Saving…" : isEdit ? "Save changes" : "Save entry"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function EntryCard({ entry, activeTab, onEdit }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const deleteEntry = useDeleteJournalEntry();
  const isGratitude = activeTab === "gratitude";
  const preview = entry.content.slice(0, 100) + (entry.content.length > 100 ? "…" : "");
  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3500);
    } else {
      deleteEntry.mutate({ id: entry.id, entryType: activeTab });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.97 },
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `shadow-soft hover:shadow-elevated transition-shadow duration-200 overflow-hidden border ${isGratitude ? "border-amber-200/40" : "border-border"}`,
          "data-ocid": "journal-entry-card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full px-5 pt-4 pb-3 flex items-start justify-between gap-3 cursor-pointer text-left",
                onClick: () => setExpanded((v) => !v),
                "aria-expanded": expanded,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formattedDate }),
                      isGratitude && /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3 text-amber-400 fill-amber-400" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground truncate", children: entry.title })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-muted-foreground mt-0.5", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                transition: { duration: 0.2 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed whitespace-pre-wrap", children: entry.content })
              },
              "full"
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                className: "text-sm text-muted-foreground leading-relaxed",
                children: preview
              },
              "preview"
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4 flex items-center justify-between gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: entry.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: `text-xs px-2 py-0.5 ${isGratitude ? "bg-amber-100/60 text-amber-800 border-amber-200/40" : ""}`,
                  children: tag
                },
                tag
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 w-7 p-0 text-muted-foreground hover:text-foreground",
                    onClick: () => onEdit(entry),
                    "aria-label": "Edit entry",
                    "data-ocid": "journal-edit-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: `h-7 px-2 text-xs transition-all ${confirmDelete ? "text-destructive bg-destructive/10 hover:bg-destructive/20" : "text-muted-foreground hover:text-destructive"}`,
                    onClick: handleDelete,
                    disabled: deleteEntry.isPending,
                    "aria-label": confirmDelete ? "Confirm delete" : "Delete entry",
                    "data-ocid": "journal-delete-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 mr-1" }),
                      confirmDelete ? "Confirm?" : ""
                    ]
                  }
                )
              ] })
            ] })
          ] })
        }
      )
    }
  );
}
function EmptyState({
  type,
  onNew
}) {
  const isGratitude = type === "gratitude";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      className: "flex flex-col items-center justify-center py-16 px-4 text-center",
      "data-ocid": "journal-empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${isGratitude ? "bg-amber-100/70" : "bg-primary/10"}`,
            children: isGratitude ? /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8 text-amber-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-2", children: isGratitude ? "Begin your gratitude practice" : "Your journal awaits" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6 leading-relaxed", children: isGratitude ? "Start your gratitude practice — what are you thankful for today?" : "Your journal is empty — what's on your mind today?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onNew,
            "data-ocid": "journal-empty-cta",
            className: isGratitude ? "bg-amber-500 hover:bg-amber-600 text-white border-0" : "",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              isGratitude ? "Write your first gratitude" : "Write your first entry"
            ]
          }
        )
      ]
    }
  );
}
function EntriesSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-12 rounded-full" })
    ] })
  ] }) }, i)) });
}
function Journal() {
  const [activeTab, setActiveTab] = reactExports.useState(
    "regular"
  );
  const [showWritePanel, setShowWritePanel] = reactExports.useState(false);
  const [editEntry, setEditEntry] = reactExports.useState(
    void 0
  );
  const { data: entries = [], isLoading } = useJournalEntries(activeTab);
  const isGratitude = activeTab === "gratitude";
  const openNew = () => {
    setEditEntry(void 0);
    setShowWritePanel(true);
  };
  const openEdit = (entry) => {
    setEditEntry(entry);
    setShowWritePanel(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const closePanel = () => {
    setShowWritePanel(false);
    setEditEntry(void 0);
  };
  const prevTabRef = reactExports.useRef(activeTab);
  if (prevTabRef.current !== activeTab) {
    prevTabRef.current = activeTab;
    closePanel();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground leading-tight", children: isGratitude ? "Gratitude Journal" : "My Journal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: isGratitude ? "Cultivate joy by noticing what you're grateful for" : "A private space for your thoughts, feelings, and reflections" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openNew,
          "data-ocid": "journal-new-btn",
          className: `transition-smooth ${isGratitude ? "bg-amber-500 hover:bg-amber-600 text-white border-0" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            "New entry"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 p-1 rounded-xl bg-muted/40 border border-border w-fit",
        role: "tablist",
        "aria-label": "Journal type",
        "data-ocid": "journal-tabs",
        children: ["regular", "gratitude"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": activeTab === tab,
            onClick: () => setActiveTab(tab),
            className: `flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${activeTab === tab ? tab === "gratitude" ? "bg-amber-500 text-white shadow-sm" : "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `journal-tab-${tab}`,
            children: [
              tab === "gratitude" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
              tab === "regular" ? "Journal" : "Gratitude"
            ]
          },
          tab
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showWritePanel && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WritePanel,
      {
        activeTab,
        onClose: closePanel,
        editEntry
      },
      "write-panel"
    ) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(EntriesSkeleton, {}) : entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { type: activeTab, onNew: openNew }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "journal-entries-list", children: entries.slice().sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      EntryCard,
      {
        entry,
        activeTab,
        onEdit: openEdit
      },
      String(entry.id)
    )) }) })
  ] });
}
export {
  Journal as default
};
