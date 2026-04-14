import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { QuizResult } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Moon,
  RotateCcw,
  Trash2,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type QuizView = "selection" | "taking" | "results" | "history";

interface QuizOption {
  value: number;
  label: string;
}

interface QuizQuestion {
  text: string;
  options: QuizOption[];
}

interface QuizDefinition {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  questions: QuizQuestion[];
  estimatedTime: string;
  scoreBands: { max: number; label: string; message: string; color: string }[];
  suggestions: { label: string; href: string }[];
}

// ─── Quiz Data ────────────────────────────────────────────────────────────────
const QUIZZES: QuizDefinition[] = [
  {
    id: "phq2",
    title: "PHQ-2 Mood Check",
    description:
      "A brief 2-question check-in about your mood over the past 2 weeks",
    icon: <Brain className="w-5 h-5" />,
    estimatedTime: "2 min",
    questions: [
      {
        text: "Little interest or pleasure in doing things?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" },
        ],
      },
      {
        text: "Feeling down, depressed, or hopeless?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" },
        ],
      },
    ],
    scoreBands: [
      {
        max: 2,
        label: "Minimal",
        color: "bg-accent/20 text-accent-foreground border-accent/30",
        message:
          "You're doing well emotionally right now. It's wonderful to check in with yourself regularly — keep nurturing your wellbeing with the tools here.",
      },
      {
        max: 4,
        label: "Moderate",
        color: "bg-chart-4/20 text-foreground border-chart-4/30",
        message:
          "It sounds like things have been a little heavy lately. That's completely okay — you're not alone in feeling this way. Taking small, gentle steps like journaling or breathing exercises can help lift your mood. Consider reaching out to someone you trust.",
      },
      {
        max: 6,
        label: "Severe",
        color: "bg-destructive/15 text-foreground border-destructive/30",
        message:
          "You've been carrying a lot. Please know that what you're feeling is valid, and support is available. We gently encourage you to speak with a mental health professional — you deserve care and compassion. You don't have to go through this alone.",
      },
    ],
    suggestions: [
      { label: "Try a breathing exercise", href: "/breathing" },
      { label: "Write in your journal", href: "/journal" },
      { label: "View wellness resources", href: "/resources" },
    ],
  },
  {
    id: "stress",
    title: "Stress Level Check",
    description: "5 questions to gauge your current stress levels",
    icon: <Zap className="w-5 h-5" />,
    estimatedTime: "3 min",
    questions: [
      {
        text: "How often have you felt overwhelmed this week?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Very often" },
        ],
      },
      {
        text: "How often have you had trouble relaxing?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Very often" },
        ],
      },
      {
        text: "How often have you felt irritable?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Very often" },
        ],
      },
      {
        text: "How often have you had difficulty concentrating?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Very often" },
        ],
      },
      {
        text: "How often have you felt anxious or on edge?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Very often" },
        ],
      },
    ],
    scoreBands: [
      {
        max: 7,
        label: "Low",
        color: "bg-accent/20 text-accent-foreground border-accent/30",
        message:
          "Your stress levels are low right now — that's wonderful! Continue the practices that are working for you, and remember that checking in regularly helps you stay balanced.",
      },
      {
        max: 13,
        label: "Moderate",
        color: "bg-chart-4/20 text-foreground border-chart-4/30",
        message:
          "You're experiencing a moderate amount of stress. It's completely normal, and there's so much you can do. Taking short breaks, breathing deeply, and connecting with others can make a real difference. Be gentle with yourself.",
      },
      {
        max: 20,
        label: "High",
        color: "bg-destructive/15 text-foreground border-destructive/30",
        message:
          "Your stress levels are quite high, and your body and mind are telling you they need care. Please take this seriously — not with alarm, but with compassion. Rest when you can, lean on support systems, and consider talking to a professional who can help you navigate this.",
      },
    ],
    suggestions: [
      { label: "Try a breathing exercise", href: "/breathing" },
      { label: "Explore wellness links", href: "/wellness" },
      { label: "View crisis resources", href: "/resources" },
    ],
  },
  {
    id: "sleep",
    title: "Sleep Quality Assessment",
    description: "6 questions about your recent sleep patterns",
    icon: <Moon className="w-5 h-5" />,
    estimatedTime: "4 min",
    questions: [
      {
        text: "How often did you have trouble falling asleep?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Less than once a week" },
          { value: 2, label: "Once or twice a week" },
          { value: 3, label: "Three or more times a week" },
        ],
      },
      {
        text: "How often did you wake during the night?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Less than once a week" },
          { value: 2, label: "Once or twice a week" },
          { value: 3, label: "Three or more times a week" },
        ],
      },
      {
        text: "How often did you wake too early?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Less than once a week" },
          { value: 2, label: "Once or twice a week" },
          { value: 3, label: "Three or more times a week" },
        ],
      },
      {
        text: "How would you rate your sleep quality overall?",
        options: [
          { value: 0, label: "Very good" },
          { value: 1, label: "Fairly good" },
          { value: 2, label: "Fairly bad" },
          { value: 3, label: "Very bad" },
        ],
      },
      {
        text: "How often did you feel tired after waking?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Less than once a week" },
          { value: 2, label: "Once or twice a week" },
          { value: 3, label: "Three or more times a week" },
        ],
      },
      {
        text: "How much did sleep trouble affect your daily life?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "A little" },
          { value: 2, label: "Somewhat" },
          { value: 3, label: "A lot" },
        ],
      },
    ],
    scoreBands: [
      {
        max: 5,
        label: "Good",
        color: "bg-accent/20 text-accent-foreground border-accent/30",
        message:
          "Your sleep quality looks healthy! Quality rest is the foundation of everything. Keep your bedtime routine consistent and enjoy the benefits of restorative sleep.",
      },
      {
        max: 12,
        label: "Fair",
        color: "bg-chart-4/20 text-foreground border-chart-4/30",
        message:
          "Your sleep could use some attention. Small adjustments — like a consistent bedtime, limiting screens before bed, or a calming wind-down routine — can help a lot. You deserve restful nights.",
      },
      {
        max: 18,
        label: "Poor",
        color: "bg-destructive/15 text-foreground border-destructive/30",
        message:
          "Your sleep is being significantly disrupted, and that affects everything from mood to energy. Please consider speaking with a doctor or sleep specialist. In the meantime, try to log your sleep patterns and explore our relaxation tools — every small step counts.",
      },
    ],
    suggestions: [
      { label: "Log your sleep", href: "/sleep" },
      { label: "Try a breathing exercise", href: "/breathing" },
      { label: "Write a bedtime journal entry", href: "/journal" },
    ],
  },
];

// ─── Backend hooks ────────────────────────────────────────────────────────────
function useBackendActor() {
  return useActor(createActor);
}

function useQuizResults(quizId?: string) {
  const { actor, isFetching: actorFetching } = useBackendActor();
  return useQuery<QuizResult[]>({
    queryKey: ["quizResults", quizId ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizResults(quizId ?? null);
    },
    enabled: !!actor && !actorFetching,
  });
}

function useSaveQuizResult() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      quizId,
      score,
      answers,
    }: {
      quizId: string;
      score: number;
      answers: string[];
    }) => {
      if (!actor) throw new Error("Actor not available");
      const today = new Date().toISOString().split("T")[0];
      const result = await actor.saveQuizResult(
        quizId,
        today,
        BigInt(score),
        answers,
      );
      if (result.__kind__ === "err") throw new Error("Failed to save result");
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizResults"] });
      toast.success("Quiz result saved!");
    },
    onError: () => toast.error("Could not save result. Please try again."),
  });
}

function useDeleteQuizResult() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (resultId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deleteQuizResult(resultId);
      if (result.__kind__ === "err") throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizResults"] });
      toast.success("Result deleted.");
    },
    onError: () => toast.error("Could not delete result."),
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getScoreBand(quiz: QuizDefinition, score: number) {
  return (
    quiz.scoreBands.find((b) => score <= b.max) ??
    quiz.scoreBands[quiz.scoreBands.length - 1]
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getLastTaken(results: QuizResult[], quizId: string): string | null {
  const filtered = results.filter((r) => r.quizId === quizId);
  if (!filtered.length) return null;
  filtered.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  return filtered[0].date;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function QuizCard({
  quiz,
  lastTaken,
  onStart,
}: {
  quiz: QuizDefinition;
  lastTaken: string | null;
  onStart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card
        className="shadow-soft border border-border hover:shadow-elevated transition-smooth"
        data-ocid={`quiz-card-${quiz.id}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {quiz.icon}
              </div>
              <div className="min-w-0">
                <CardTitle className="font-display text-lg leading-snug">
                  {quiz.title}
                </CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {quiz.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Brain className="w-3.5 h-3.5" />
              {quiz.questions.length} questions
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />~{quiz.estimatedTime}
            </span>
          </div>
          {lastTaken && (
            <p className="text-xs text-muted-foreground">
              Last taken: {formatDate(lastTaken)}
            </p>
          )}
          <Button
            className="w-full"
            onClick={onStart}
            data-ocid={`start-quiz-${quiz.id}`}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function QuizTaking({
  quiz,
  onComplete,
  onCancel,
}: {
  quiz: QuizDefinition;
  onComplete: (answers: number[]) => void;
  onCancel: () => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(quiz.questions.length).fill(null),
  );
  const [direction, setDirection] = useState<1 | -1>(1);

  const question = quiz.questions[currentQ];
  const selectedAnswer = answers[currentQ];
  const isLast = currentQ === quiz.questions.length - 1;
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;

  const goNext = () => {
    if (isLast) {
      const allAnswered = answers.every((a) => a !== null);
      if (allAnswered) onComplete(answers as number[]);
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

  const selectAnswer = (value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = value;
      return next;
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6" data-ocid="quiz-taking">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <h2 className="font-display text-xl font-semibold text-foreground truncate">
            {quiz.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Question {currentQ + 1} of {quiz.questions.length}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          aria-label="Cancel quiz"
          data-ocid="cancel-quiz"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-soft border border-border">
            <CardContent className="pt-6 space-y-5">
              <p className="font-display text-lg font-medium text-foreground leading-snug">
                {question.text}
              </p>
              <div className="space-y-2.5">
                {question.options.map((opt) => {
                  const isSelected = selectedAnswer === opt.value;
                  const inputId = `q${currentQ}-opt${opt.value}`;
                  return (
                    <label
                      key={opt.value}
                      htmlFor={inputId}
                      data-ocid={`answer-option-${opt.value}`}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 transition-smooth cursor-pointer focus-within:ring-2 focus-within:ring-ring
                        ${
                          isSelected
                            ? "border-primary bg-primary/10 text-foreground font-medium"
                            : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                    >
                      <input
                        type="radio"
                        id={inputId}
                        name={`question-${currentQ}`}
                        value={opt.value}
                        checked={isSelected}
                        onChange={() => selectAnswer(opt.value)}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-smooth ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={currentQ === 0}
          data-ocid="prev-question"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Previous
        </Button>
        <Button
          onClick={goNext}
          disabled={selectedAnswer === null}
          data-ocid="next-question"
        >
          {isLast ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Finish
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function QuizResults({
  quiz,
  score,
  onSave,
  onRetake,
  onBack,
  isSaving,
  alreadySaved,
}: {
  quiz: QuizDefinition;
  score: number;
  onSave: () => void;
  onRetake: () => void;
  onBack: () => void;
  isSaving: boolean;
  alreadySaved: boolean;
}) {
  const maxScore = quiz.questions.reduce(
    (acc, q) => acc + Math.max(...q.options.map((o) => o.value)),
    0,
  );
  const band = getScoreBand(quiz, score);
  const pct = Math.round((score / maxScore) * 100);

  return (
    <motion.div
      className="max-w-2xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-ocid="quiz-results"
    >
      {/* Score summary */}
      <Card className="shadow-elevated border border-border">
        <CardContent className="pt-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              {quiz.icon}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your result for</p>
              <h2 className="font-display text-xl font-semibold text-foreground">
                {quiz.title}
              </h2>
            </div>
          </div>

          {/* Score bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Score</span>
              <span className="font-semibold text-foreground">
                {score} / {maxScore}
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              />
            </div>
          </div>

          <div
            className={`inline-flex items-center rounded-xl border px-4 py-2 ${band.color}`}
          >
            <span className="font-semibold">{band.label}</span>
          </div>

          <p className="text-foreground/80 leading-relaxed text-sm">
            {band.message}
          </p>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card className="shadow-soft border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Wind className="w-4 h-4 text-primary" />
            Suggested next steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quiz.suggestions.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="flex items-center gap-2 text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              data-ocid={`suggestion-link-${s.href.replace("/", "")}`}
            >
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
              {s.label}
            </a>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {!alreadySaved && (
          <Button onClick={onSave} disabled={isSaving} data-ocid="save-result">
            {isSaving ? "Saving…" : "Save Result"}
          </Button>
        )}
        {alreadySaved && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Saved to your history
          </div>
        )}
        <Button variant="outline" onClick={onRetake} data-ocid="retake-quiz">
          <RotateCcw className="w-4 h-4 mr-1.5" />
          Take Again
        </Button>
        <Button variant="ghost" onClick={onBack} data-ocid="back-to-quizzes">
          Back to Quizzes
        </Button>
      </div>
    </motion.div>
  );
}

function QuizHistory({
  results,
  isLoading,
  onDelete,
  isDeleting,
}: {
  results: QuizResult[];
  isLoading: boolean;
  onDelete: (id: bigint) => void;
  isDeleting: boolean;
}) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!results.length) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center space-y-3"
        data-ocid="empty-quiz-history"
      >
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
          <Brain className="w-7 h-7 text-muted-foreground" />
        </div>
        <p className="font-display text-lg font-semibold text-foreground">
          No history yet
        </p>
        <p className="text-muted-foreground text-sm max-w-xs">
          Complete a quiz and save your result to see your history here.
        </p>
      </div>
    );
  }

  const sorted = [...results].sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1,
  );

  return (
    <div className="space-y-3" data-ocid="quiz-history-list">
      {sorted.map((r) => {
        const quiz = QUIZZES.find((q) => q.id === r.quizId);
        const band = quiz ? getScoreBand(quiz, Number(r.score)) : null;
        return (
          <motion.div
            key={r.id.toString()}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="shadow-soft border border-border"
              data-ocid={`history-row-${r.id}`}
            >
              <CardContent className="py-3 px-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {quiz?.icon ?? <Brain className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {quiz?.title ?? r.quizId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(r.date)} · Score: {r.score.toString()}
                      {band && (
                        <span className="ml-1.5">
                          ·{" "}
                          <Badge
                            variant="outline"
                            className={`text-xs py-0 ${band.color}`}
                          >
                            {band.label}
                          </Badge>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isDeleting}
                  onClick={() => onDelete(r.id)}
                  aria-label="Delete result"
                  data-ocid={`delete-result-${r.id}`}
                  className="text-muted-foreground hover:text-destructive flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Quizzes() {
  const [view, setView] = useState<QuizView>("selection");
  const [activeTab, setActiveTab] = useState<"quizzes" | "history">("quizzes");
  const [activeQuiz, setActiveQuiz] = useState<QuizDefinition | null>(null);
  const [completedScore, setCompletedScore] = useState<number>(0);
  const [completedAnswers, setCompletedAnswers] = useState<string[]>([]);
  const [resultSaved, setResultSaved] = useState(false);

  const { data: allResults = [], isLoading: resultsLoading } = useQuizResults();
  const saveResult = useSaveQuizResult();
  const deleteResult = useDeleteQuizResult();

  const handleStart = (quiz: QuizDefinition) => {
    setActiveQuiz(quiz);
    setResultSaved(false);
    setView("taking");
  };

  const handleComplete = (answers: number[]) => {
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
        answers: completedAnswers,
      },
      { onSuccess: () => setResultSaved(true) },
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

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Self-Assessment Quizzes
        </h1>
        <p className="text-muted-foreground mt-1">
          Gentle check-ins to better understand how you're feeling.
        </p>
      </div>

      {/* Quiz taking view (full takeover) */}
      <AnimatePresence mode="wait">
        {view === "taking" && activeQuiz && (
          <motion.div
            key="taking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizTaking
              quiz={activeQuiz}
              onComplete={handleComplete}
              onCancel={handleBack}
            />
          </motion.div>
        )}

        {view === "results" && activeQuiz && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizResults
              quiz={activeQuiz}
              score={completedScore}
              onSave={handleSave}
              onRetake={handleRetake}
              onBack={handleBack}
              isSaving={saveResult.isPending}
              alreadySaved={resultSaved}
            />
          </motion.div>
        )}

        {view === "selection" && (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Tabs */}
            <div
              className="flex gap-1 p-1 bg-muted rounded-xl w-fit"
              role="tablist"
              data-ocid="quiz-tabs"
            >
              {(["quizzes", "history"] as const).map((tab) => (
                <button
                  type="button"
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  data-ocid={`tab-${tab}`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                    ${
                      activeTab === tab
                        ? "bg-card text-foreground shadow-soft"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {tab === "history" ? "My History" : "Quizzes"}
                </button>
              ))}
            </div>

            {/* Quiz cards */}
            {activeTab === "quizzes" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {QUIZZES.map((quiz, i) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <QuizCard
                      quiz={quiz}
                      lastTaken={getLastTaken(allResults, quiz.id)}
                      onStart={() => handleStart(quiz)}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* History */}
            {activeTab === "history" && (
              <QuizHistory
                results={allResults}
                isLoading={resultsLoading}
                onDelete={(id) => deleteResult.mutate(id)}
                isDeleting={deleteResult.isPending}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
