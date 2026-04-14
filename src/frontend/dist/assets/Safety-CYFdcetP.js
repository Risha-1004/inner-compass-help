import { h as useActor, o as useQueryClient, r as reactExports, b as useQuery, p as useMutation, j as jsxRuntimeExports, S as Skeleton, m as motion, C as Card, k as CardHeader, l as CardTitle, H as Heart, e as CardContent, n as Button, X, g as Badge, q as ue, i as createActor } from "./index-Chdf2p0o.js";
import { I as Input } from "./input-Cu6OzIVX.js";
import { L as Label } from "./label-DSwR1ZcM.js";
import { T as Textarea } from "./textarea-DaWkEaNe.js";
import { S as Shield } from "./shield-CQqCAjqY.js";
import { T as Trash2 } from "./trash-2-CFcnQdCp.js";
import { T as TriangleAlert } from "./triangle-alert-E2hQD1OT.js";
import { E as ExternalLink } from "./external-link-D2RL2b53.js";
import { P as Plus } from "./plus-BzfKwx4k.js";
import "./index-BDOZE7B6.js";
function CrisisBox() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      className: "rounded-xl border-2 border-destructive/30 bg-destructive/5 p-5",
      "data-ocid": "crisis-resources-box",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TriangleAlert,
          {
            className: "mt-0.5 h-5 w-5 flex-shrink-0 text-destructive",
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold text-destructive", children: "If you're in immediate danger" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/80", children: [
            "Call emergency services: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "911" }),
            " (US) ·",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "999" }),
            " (UK) · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "112" }),
            " (EU/International)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/80", children: [
            "Crisis Text Line: Text ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "HOME" }),
            " to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "741741" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "https://www.iasp.info/resources/Crisis_Centres/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1.5 text-sm text-primary underline underline-offset-2 hover:opacity-80 transition-smooth",
              children: [
                "International Crisis Centre Directory (IASP)",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function StringListSection({
  title,
  description,
  items,
  placeholder,
  onAdd,
  onRemove,
  ocid
}) {
  const [input, setInput] = reactExports.useState("");
  const handleAdd = () => {
    const v = input.trim();
    if (!v) return;
    onAdd(v);
    setInput("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: input,
          onChange: (e) => setInput(e.target.value),
          placeholder,
          onKeyDown: (e) => e.key === "Enter" && handleAdd(),
          className: "flex-1",
          "aria-label": `Add to ${title}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleAdd,
          "aria-label": "Add item",
          "data-ocid": `${ocid}-add`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
        }
      )
    ] }),
    items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground min-w-0 break-words", children: item }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onRemove(i),
              "aria-label": `Remove "${item}"`,
              className: "text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ]
      },
      `item-${i}-${item.slice(0, 8)}`
    )) })
  ] });
}
function SupportContactsSection({
  title,
  contacts,
  onAdd,
  onRemove
}) {
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [relation, setRelation] = reactExports.useState("");
  const handleAdd = () => {
    if (!name.trim() || !phone.trim()) return;
    onAdd({
      name: name.trim(),
      phone: phone.trim(),
      relation: relation.trim()
    });
    setName("");
    setPhone("");
    setRelation("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "support-contacts-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "People you trust to reach out to" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: name,
          onChange: (e) => setName(e.target.value),
          placeholder: "Name",
          "aria-label": "Contact name"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: phone,
          onChange: (e) => setPhone(e.target.value),
          placeholder: "Phone number",
          "aria-label": "Phone number"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: relation,
          onChange: (e) => setRelation(e.target.value),
          placeholder: "Relationship (e.g. Best friend)",
          "aria-label": "Relationship"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: handleAdd,
        "data-ocid": "support-contact-add",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
          " Add contact"
        ]
      }
    ),
    contacts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: contacts.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: c.phone }),
            c.relation && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-2 text-xs", children: c.relation })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onRemove(i),
              "aria-label": `Remove ${c.name}`,
              className: "text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ]
      },
      `support-${c.name}-${i}`
    )) })
  ] });
}
function ProfessionalContactsSection({
  contacts,
  onAdd,
  onRemove
}) {
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("");
  const handleAdd = () => {
    if (!name.trim() || !phone.trim()) return;
    onAdd({ name: name.trim(), phone: phone.trim(), role: role.trim() });
    setName("");
    setPhone("");
    setRole("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "professional-contacts-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Professional Support" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Therapists, doctors, or counselors" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: name,
          onChange: (e) => setName(e.target.value),
          placeholder: "Name",
          "aria-label": "Professional name"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: phone,
          onChange: (e) => setPhone(e.target.value),
          placeholder: "Phone number",
          "aria-label": "Phone number"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: role,
          onChange: (e) => setRole(e.target.value),
          placeholder: "Role (e.g. Therapist)",
          "aria-label": "Role"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: handleAdd,
        "data-ocid": "professional-contact-add",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
          " Add professional"
        ]
      }
    ),
    contacts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: contacts.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: c.phone }),
            c.role && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-2 text-xs", children: c.role })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onRemove(i),
              "aria-label": `Remove ${c.name}`,
              className: "text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ]
      },
      `prof-${c.name}-${i}`
    )) })
  ] });
}
function Safety() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const { data: plan, isLoading } = useQuery({
    queryKey: ["safetyPlan"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSafetyPlan();
    },
    enabled: !!actor && !isFetching
  });
  const [reasonsToLive, setReasonsToLive] = reactExports.useState([]);
  const [warningSigns, setWarningSigns] = reactExports.useState([]);
  const [copingStrategies, setCopingStrategies] = reactExports.useState([]);
  const [supportContacts, setSupportContacts] = reactExports.useState([]);
  const [professionalContacts, setProfessionalContacts] = reactExports.useState([]);
  const [safeEnvironmentNotes, setSafeEnvironmentNotes] = reactExports.useState("");
  reactExports.useEffect(() => {
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
        safeEnvironmentNotes
      );
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        queryClient.invalidateQueries({ queryKey: ["safetyPlan"] });
        ue.success("Your safety plan has been saved privately.");
      } else {
        ue.error("Could not save your plan. Please try again.");
      }
    },
    onError: () => ue.error("Something went wrong. Please try again.")
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
        ue.success("Your safety plan has been deleted.");
      }
    },
    onError: () => ue.error("Could not delete. Please try again.")
  });
  const removeFrom = (arr, i) => [
    ...arr.slice(0, i),
    ...arr.slice(i + 1)
  ];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-10", "data-ocid": "safety-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Safety Plan" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground max-w-xl", children: [
            "Your personal safety plan is a private tool to help you through difficult times.",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Only you can see this." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CrisisBox, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5 text-primary" }),
            "Your Safety Plan"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StringListSection,
              {
                title: "Why I Want to Stay",
                description: "Reasons to live — people, places, hopes, things that matter to you",
                items: reasonsToLive,
                placeholder: "Add a reason that matters to you...",
                onAdd: (v) => setReasonsToLive([...reasonsToLive, v]),
                onRemove: (i) => setReasonsToLive(removeFrom(reasonsToLive, i)),
                ocid: "reasons-to-live"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StringListSection,
              {
                title: "Warning Signs",
                description: "Signs that tell you you're in crisis — thoughts, feelings, behaviors",
                items: warningSigns,
                placeholder: "e.g. I start withdrawing from friends...",
                onAdd: (v) => setWarningSigns([...warningSigns, v]),
                onRemove: (i) => setWarningSigns(removeFrom(warningSigns, i)),
                ocid: "warning-signs"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StringListSection,
              {
                title: "Coping Strategies",
                description: "Things you can do when you feel overwhelmed — activities, thoughts, practices",
                items: copingStrategies,
                placeholder: "e.g. Take a walk, call a friend, journal...",
                onAdd: (v) => setCopingStrategies([...copingStrategies, v]),
                onRemove: (i) => setCopingStrategies(removeFrom(copingStrategies, i)),
                ocid: "coping-strategies"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SupportContactsSection,
              {
                title: "People I Can Call",
                contacts: supportContacts,
                onAdd: (c) => setSupportContacts([...supportContacts, c]),
                onRemove: (i) => setSupportContacts(removeFrom(supportContacts, i))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProfessionalContactsSection,
              {
                contacts: professionalContacts,
                onAdd: (c) => setProfessionalContacts([...professionalContacts, c]),
                onRemove: (i) => setProfessionalContacts(removeFrom(professionalContacts, i))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "safe-environment-notes", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "safe-env",
                  className: "font-semibold text-foreground",
                  children: "My Safe Environment"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Things you can do to make your surroundings safer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "safe-env",
                  value: safeEnvironmentNotes,
                  onChange: (e) => setSafeEnvironmentNotes(e.target.value),
                  placeholder: "e.g. Remove items that could cause harm, stay with someone I trust...",
                  rows: 4,
                  className: "resize-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => saveMutation.mutate(),
                  disabled: saveMutation.isPending,
                  className: "min-w-[140px]",
                  "data-ocid": "save-safety-plan",
                  children: saveMutation.isPending ? "Saving…" : "Save my plan"
                }
              ),
              plan && (confirmDelete ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-medium", children: "Are you sure? This cannot be undone." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "destructive",
                    size: "sm",
                    onClick: () => deleteMutation.mutate(),
                    disabled: deleteMutation.isPending,
                    "data-ocid": "confirm-delete-plan",
                    children: deleteMutation.isPending ? "Deleting…" : "Yes, delete"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => setConfirmDelete(false),
                    children: "Cancel"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-muted-foreground hover:text-destructive",
                  onClick: () => setConfirmDelete(true),
                  "data-ocid": "delete-safety-plan",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-1" }),
                    "Delete plan"
                  ]
                }
              ))
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  Safety as default
};
