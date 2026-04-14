import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, b as useQuery, o as useQueryClient, p as useMutation, n as Button, X, C as Card, e as CardContent, k as CardHeader, l as CardTitle, W as Wind, M as Moon, S as Skeleton, g as Badge, h as useActor, q as ue, i as createActor } from "./index-Chdf2p0o.js";
import { A as AnimatePresence } from "./index-BBuRJ3Ez.js";
import { C as CircleCheck } from "./circle-check-BwKnBPQm.js";
import { C as Clock } from "./clock-CmMNQ6HQ.js";
import { T as Trash2 } from "./trash-2-CFcnQdCp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const QUIZZES = [
  {
    id: "phq2",
    title: "PHQ-2 Mood Check",
    description: "A brief 2-question check-in about your mood over the past 2 weeks",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5" }),
    estimatedTime: "2 min",
    questions: [
      {
        text: "Little interest or pleasure in doing things?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        text: "Feeling down, depressed, or hopeless?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      }
    ],
    scoreBands: [
      {
        max: 2,
        label: "Minimal",
        color: "bg-accent/20 text-accent-foreground border-accent/30",
        message: "You're doing well emotionally right now. It's wonderful to check in with yourself regularly — keep nurturing your wellbeing with the tools here."
      },
      {
        max: 4,
        label: "Moderate",
        color: "bg-chart-4/20 text-foreground border-chart-4/30",
        message: "It sounds like things have been a little heavy lately. That's completely okay — you're not alone in feeling this way. Taking small, gentle steps like journaling or breathing exercises can help lift your mood. Consider reaching out to someone you trust."
      },
      {
        max: 6,
        label: "Severe",
        color: "bg-destructive/15 text-foreground border-destructive/30",
        message: "You've been carrying a lot. Please know that what you're feeling is valid, and support is available. We gently encourage you to speak with a mental health professional — you deserve care and compassion. You don't have to go through this alone."
      }
    ],
    suggestions: [
      { label: "Try a breathing exercise", href: "/breathing" },
      { label: "Write in your journal", href: "/journal" },
      { label: "View wellness resources", href: "/resources" }
    ]
  },
  {
    id: "stress",
    title: "Stress Level Check",
    description: "5 questions to gauge your current stress levels",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }),
    estimatedTime: "3 min",
    questions: [
      {
        text: "How often have you felt overwhelmed this week?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Very often" }
        ]
      },
      {
        text: "How often have you had trouble relaxing?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Very often" }
        ]
      },
      {
        text: "How often have you felt irritable?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Very often" }
        ]
      },
      {
        text: "How often have you had difficulty concentrating?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Very often" }
        ]
      },
      {
        text: "How often have you felt anxious or on edge?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Very often" }
        ]
      }
    ],
    scoreBands: [
      {
        max: 7,
        label: "Low",
        color: "bg-accent/20 text-accent-foreground border-accent/30",
        message: "Your stress levels are low right now — that's wonderful! Continue the practices that are working for you, and remember that checking in regularly helps you stay balanced."
      },
      {
        max: 13,
        label: "Moderate",
        color: "bg-chart-4/20 text-foreground border-chart-4/30",
        message: "You're experiencing a moderate amount of stress. It's completely normal, and there's so much you can do. Taking short breaks, breathing deeply, and connecting with others can make a real difference. Be gentle with yourself."
      },
      {
        max: 20,
        label: "High",
        color: "bg-destructive/15 text-foreground border-destructive/30",
        message: "Your stress levels are quite high, and your body and mind are telling you they need care. Please take this seriously — not with alarm, but with compassion. Rest when you can, lean on support systems, and consider talking to a professional who can help you navigate this."
      }
    ],
    suggestions: [
      { label: "Try a breathing exercise", href: "/breathing" },
      { label: "Explore wellness links", href: "/wellness" },
      { label: "View crisis resources", href: "/resources" }
    ]
  },
  {
    id: "sleep",
    title: "Sleep Quality Assessment",
    description: "6 questions about your recent sleep patterns",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-5 h-5" }),
    estimatedTime: "4 min",
    questions: [
      {
        text: "How often did you have trouble falling asleep?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Less than once a week" },
          { value: 2, label: "Once or twice a week" },
          { value: 3, label: "Three or more times a week" }
        ]
      },
      {
        text: "How often did you wake during the night?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Less than once a week" },
          { value: 2, label: "Once or twice a week" },
          { value: 3, label: "Three or more times a week" }
        ]
      },
      {
        text: "How often did you wake too early?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Less than once a week" },
          { value: 2, label: "Once or twice a week" },
          { value: 3, label: "Three or more times a week" }
        ]
      },
      {
        text: "How would you rate your sleep quality overall?",
        options: [
          { value: 0, label: "Very good" },
          { value: 1, label: "Fairly good" },
          { value: 2, label: "Fairly bad" },
          { value: 3, label: "Very bad" }
        ]
      },
      {
        text: "How often did you feel tired after waking?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Less than once a week" },
          { value: 2, label: "Once or twice a week" },
          { value: 3, label: "Three or more times a week" }
        ]
      },
      {
        text: "How much did sleep trouble affect your daily life?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "A little" },
          { value: 2, label: "Somewhat" },
          { value: 3, label: "A lot" }
        ]
      }
    ],
    scoreBands: [
      {
        max: 5,
        label: "Good",
        color: "bg-accent/20 text-accent-foreground border-accent/30",
        message: "Your sleep quality looks healthy! Quality rest is the foundation of everything. Keep your bedtime routine consistent and enjoy the benefits of restorative sleep."
      },
      {
        max: 12,
        label: "Fair",
        color: "bg-chart-4/20 text-foreground border-chart-4/30",
        message: "Your sleep could use some attention. Small adjustments — like a consistent bedtime, limiting screens before bed, or a calming wind-down routine — can help a lot. You deserve restful nights."
      },
      {
        max: 18,
        label: "Poor",
        color: "bg-destructive/15 text-foreground border-destructive/30",
        message: "Your sleep is being significantly disrupted, and that affects everything from mood to energy. Please consider speaking with a doctor or sleep specialist. In the meantime, try to log your sleep patterns and explore our relaxation tools — every small step counts."
      }
    ],
    suggestions: [
      { label: "Log your sleep", href: "/sleep" },
      { label: "Try a breathing exercise", href: "/breathing" },
      { label: "Write a bedtime journal entry", href: "/journal" }
    ]
  }
];
function useBackendActor() {
  return useActor(createActor);
}
function useQuizResults(quizId) {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery({
    queryKey: ["quizResults", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizResults(null);
    },
    enabled: !!actor && !actorFetching
  });
}
function useSaveQuizResult() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      quizId,
      score,
      answers
    }) => {
      if (!actor) throw new Error("Actor not available");
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const result = await actor.saveQuizResult(
        quizId,
        today,
        BigInt(score),
        answers
      );
      if (result.__kind__ === "err") throw new Error("Failed to save result");
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizResults"] });
      ue.success("Quiz result saved!");
    },
    onError: () => ue.error("Could not save result. Please try again.")
  });
}
function useDeleteQuizResult() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (resultId) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteQuizResult(resultId);
      if (result.__kind__ === "err") throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizResults"] });
      ue.success("Result deleted.");
    },
    onError: () => ue.error("Could not delete result.")
  });
}
function getScoreBand(quiz, score) {
  return quiz.scoreBands.find((b) => score <= b.max) ?? quiz.scoreBands[quiz.scoreBands.length - 1];
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function getLastTaken(results, quizId) {
  const filtered = results.filter((r) => r.quizId === quizId);
  if (!filtered.length) return null;
  filtered.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
  return filtered[0].date;
}
function QuizCard({
  quiz,
  lastTaken,
  onStart
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "shadow-soft border border-border hover:shadow-elevated transition-smooth",
          "data-ocid": `quiz-card-${quiz.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0", children: quiz.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg leading-snug", children: quiz.title }) })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: quiz.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-3.5 h-3.5" }),
                  quiz.questions.length,
                  " questions"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                  "~",
                  quiz.estimatedTime
                ] })
              ] }),
              lastTaken && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Last taken: ",
                formatDate(lastTaken)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full",
                  onClick: onStart,
                  "data-ocid": `start-quiz-${quiz.id}`,
                  children: "Start Quiz"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function QuizTaking({
  quiz,
  onComplete,
  onCancel
}) {
  const [currentQ, setCurrentQ] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState(
    Array(quiz.questions.length).fill(null)
  );
  const [direction, setDirection] = reactExports.useState(1);
  const question = quiz.questions[currentQ];
  const selectedAnswer = answers[currentQ];
  const isLast = currentQ === quiz.questions.length - 1;
  const progress = (currentQ + 1) / quiz.questions.length * 100;
  const goNext = () => {
    if (isLast) {
      const allAnswered = answers.every((a) => a !== null);
      if (allAnswered) onComplete(answers);
    } else {
      setDirection(1);
      setCurrentQ((q) => q + 1);
    }
  };
  const goPrev = () => {
    if (currentQ > 0) {
      setDirection(-1);
      setCurrentQ((q) => q - 1);
    }
  };
  const selectAnswer = (value) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = value;
      return next;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", "data-ocid": "quiz-taking", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground truncate", children: quiz.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          "Question ",
          currentQ + 1,
          " of ",
          quiz.questions.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: onCancel,
          "aria-label": "Cancel quiz",
          "data-ocid": "cancel-quiz",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "h-full bg-primary rounded-full",
        initial: { width: 0 },
        animate: { width: `${progress}%` },
        transition: { duration: 0.4, ease: "easeOut" }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: direction * 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -40 },
        transition: { duration: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-soft border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-medium text-foreground leading-snug", children: question.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: question.options.map((opt) => {
            const isSelected = selectedAnswer === opt.value;
            const inputId = `q${currentQ}-opt${opt.value}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: inputId,
                "data-ocid": `answer-option-${opt.value}`,
                className: `flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 transition-smooth cursor-pointer focus-within:ring-2 focus-within:ring-ring
                        ${isSelected ? "border-primary bg-primary/10 text-foreground font-medium" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      id: inputId,
                      name: `question-${currentQ}`,
                      value: opt.value,
                      checked: isSelected,
                      onChange: () => selectAnswer(opt.value),
                      className: "sr-only"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `w-4 h-4 rounded-full border-2 flex-shrink-0 transition-smooth ${isSelected ? "border-primary bg-primary" : "border-border"}`
                    }
                  ),
                  opt.label
                ]
              },
              opt.value
            );
          }) })
        ] }) })
      },
      currentQ
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: goPrev,
          disabled: currentQ === 0,
          "data-ocid": "prev-question",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1.5" }),
            "Previous"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: goNext,
          disabled: selectedAnswer === null,
          "data-ocid": "next-question",
          children: isLast ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-1.5" }),
            "Finish"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Next",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1.5" })
          ] })
        }
      )
    ] })
  ] });
}
function QuizResults({
  quiz,
  score,
  onSave,
  onRetake,
  onBack,
  isSaving,
  alreadySaved
}) {
  const maxScore = quiz.questions.reduce(
    (acc, q) => acc + Math.max(...q.options.map((o) => o.value)),
    0
  );
  const band = getScoreBand(quiz, score);
  const pct = Math.round(score / maxScore * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "max-w-2xl mx-auto space-y-6",
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      "data-ocid": "quiz-results",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-elevated border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0", children: quiz.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your result for" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: quiz.title })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                score,
                " / ",
                maxScore
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-3 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full bg-primary rounded-full",
                initial: { width: 0 },
                animate: { width: `${pct}%` },
                transition: { duration: 0.7, ease: "easeOut", delay: 0.2 }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `inline-flex items-center rounded-xl border px-4 py-2 ${band.color}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: band.label })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 leading-relaxed text-sm", children: band.message })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "w-4 h-4 text-primary" }),
            "Suggested next steps"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: quiz.suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: s.href,
              className: "flex items-center gap-2 text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
              "data-ocid": `suggestion-link-${s.href.replace("/", "")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                s.label
              ]
            },
            s.href
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          !alreadySaved && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onSave, disabled: isSaving, "data-ocid": "save-result", children: isSaving ? "Saving…" : "Save Result" }),
          alreadySaved && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary" }),
            "Saved to your history"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: onRetake, "data-ocid": "retake-quiz", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 mr-1.5" }),
            "Take Again"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: onBack, "data-ocid": "back-to-quizzes", children: "Back to Quizzes" })
        ] })
      ]
    }
  );
}
function QuizHistory({
  results,
  isLoading,
  onDelete,
  isDeleting
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, i)) });
  }
  if (!results.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center space-y-3",
        "data-ocid": "empty-quiz-history",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: "No history yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Complete a quiz and save your result to see your history here." })
        ]
      }
    );
  }
  const sorted = [...results].sort(
    (a, b) => a.createdAt > b.createdAt ? -1 : 1
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "quiz-history-list", children: sorted.map((r) => {
    const quiz = QUIZZES.find((q) => q.id === r.quizId);
    const band = quiz ? getScoreBand(quiz, Number(r.score)) : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -12 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "shadow-soft border border-border",
            "data-ocid": `history-row-${r.id}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-3 px-4 flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0", children: (quiz == null ? void 0 : quiz.icon) ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: (quiz == null ? void 0 : quiz.title) ?? r.quizId }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    formatDate(r.date),
                    " · Score: ",
                    r.score.toString(),
                    band && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5", children: [
                      "·",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: `text-xs py-0 ${band.color}`,
                          children: band.label
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  disabled: isDeleting,
                  onClick: () => onDelete(r.id),
                  "aria-label": "Delete result",
                  "data-ocid": `delete-result-${r.id}`,
                  className: "text-muted-foreground hover:text-destructive flex-shrink-0",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          }
        )
      },
      r.id.toString()
    );
  }) });
}
function Quizzes() {
  const [view, setView] = reactExports.useState("selection");
  const [activeTab, setActiveTab] = reactExports.useState("quizzes");
  const [activeQuiz, setActiveQuiz] = reactExports.useState(null);
  const [completedScore, setCompletedScore] = reactExports.useState(0);
  const [completedAnswers, setCompletedAnswers] = reactExports.useState([]);
  const [resultSaved, setResultSaved] = reactExports.useState(false);
  const { data: allResults = [], isLoading: resultsLoading } = useQuizResults();
  const saveResult = useSaveQuizResult();
  const deleteResult = useDeleteQuizResult();
  const handleStart = (quiz) => {
    setActiveQuiz(quiz);
    setResultSaved(false);
    setView("taking");
  };
  const handleComplete = (answers) => {
    if (!activeQuiz) return;
    const score = answers.reduce((a, b) => a + b, 0);
    setCompletedScore(score);
    setCompletedAnswers(answers.map(String));
    setView("results");
  };
  const handleSave = () => {
    if (!activeQuiz) return;
    saveResult.mutate(
      {
        quizId: activeQuiz.id,
        score: completedScore,
        answers: completedAnswers
      },
      { onSuccess: () => setResultSaved(true) }
    );
  };
  const handleRetake = () => {
    setResultSaved(false);
    setView("taking");
  };
  const handleBack = () => {
    setActiveQuiz(null);
    setView("selection");
    setActiveTab("quizzes");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Self-Assessment Quizzes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Gentle check-ins to better understand how you're feeling." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      view === "taking" && activeQuiz && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuizTaking,
            {
              quiz: activeQuiz,
              onComplete: handleComplete,
              onCancel: handleBack
            }
          )
        },
        "taking"
      ),
      view === "results" && activeQuiz && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuizResults,
            {
              quiz: activeQuiz,
              score: completedScore,
              onSave: handleSave,
              onRetake: handleRetake,
              onBack: handleBack,
              isSaving: saveResult.isPending,
              alreadySaved: resultSaved
            }
          )
        },
        "results"
      ),
      view === "selection" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-1 p-1 bg-muted rounded-xl w-fit",
                role: "tablist",
                "data-ocid": "quiz-tabs",
                children: ["quizzes", "history"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    role: "tab",
                    "aria-selected": activeTab === tab,
                    onClick: () => setActiveTab(tab),
                    "data-ocid": `tab-${tab}`,
                    className: `px-4 py-2 text-sm font-medium rounded-lg transition-smooth capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                    ${activeTab === tab ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`,
                    children: tab === "history" ? "My History" : "Quizzes"
                  },
                  tab
                ))
              }
            ),
            activeTab === "quizzes" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: QUIZZES.map((quiz, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.1 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  QuizCard,
                  {
                    quiz,
                    lastTaken: getLastTaken(allResults, quiz.id),
                    onStart: () => handleStart(quiz)
                  }
                )
              },
              quiz.id
            )) }),
            activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuizHistory,
              {
                results: allResults,
                isLoading: resultsLoading,
                onDelete: (id) => deleteResult.mutate(id),
                isDeleting: deleteResult.isPending
              }
            )
          ]
        },
        "selection"
      )
    ] })
  ] });
}
export {
  Quizzes as default
};
