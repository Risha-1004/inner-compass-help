import ProfileTypes "types/profile";
import MoodTypes "types/mood";
import HabitTypes "types/habit";
import CycleTypes "types/cycle";
import JournalTypes "types/journal";
import GoalTypes "types/goal";
import SleepTypes "types/sleep";
import WaterTypes "types/water";
import QuizTypes "types/quiz";
import SafetyTypes "types/safety";

import ProfileMixin "mixins/profile-api";
import MoodMixin "mixins/mood-api";
import HabitMixin "mixins/habit-api";
import CycleMixin "mixins/cycle-api";
import JournalMixin "mixins/journal-api";
import GoalMixin "mixins/goal-api";
import SleepMixin "mixins/sleep-api";
import WaterMixin "mixins/water-api";
import QuizMixin "mixins/quiz-api";
import SafetyMixin "mixins/safety-api";
import AffirmationMixin "mixins/affirmation-api";

import Map "mo:core/Map";
import List "mo:core/List";

actor {
  // ── User Profiles ──────────────────────────────────────────────────────────
  let profiles = Map.empty<Principal, ProfileTypes.UserProfile>();

  // ── Mood ───────────────────────────────────────────────────────────────────
  let moodLogs = Map.empty<Principal, List.List<MoodTypes.MoodEntry>>();

  // ── Habits ─────────────────────────────────────────────────────────────────
  let habits = Map.empty<Principal, List.List<HabitTypes.Habit>>();
  let habitCompletions = Map.empty<Principal, List.List<HabitTypes.HabitCompletion>>();

  // ── Cycle ──────────────────────────────────────────────────────────────────
  let cycleLogs = Map.empty<Principal, List.List<CycleTypes.CycleLog>>();
  let symptomsLogs = Map.empty<Principal, List.List<CycleTypes.SymptomsLog>>();

  // ── Journal ────────────────────────────────────────────────────────────────
  let journals = Map.empty<Principal, List.List<JournalTypes.JournalEntry>>();

  // ── Goals ──────────────────────────────────────────────────────────────────
  let goals = Map.empty<Principal, List.List<GoalTypes.Goal>>();

  // ── Sleep ──────────────────────────────────────────────────────────────────
  let sleepLogs = Map.empty<Principal, List.List<SleepTypes.SleepLog>>();

  // ── Water ──────────────────────────────────────────────────────────────────
  let waterLogs = Map.empty<Principal, List.List<WaterTypes.WaterIntakeEntry>>();
  let waterGoals = Map.empty<Principal, Nat>();

  // ── Quizzes ────────────────────────────────────────────────────────────────
  let quizResults = Map.empty<Principal, List.List<QuizTypes.QuizResult>>();

  // ── Safety Plan ────────────────────────────────────────────────────────────
  let safetyPlans = Map.empty<Principal, SafetyTypes.SafetyPlan>();

  // ── Mixin composition ──────────────────────────────────────────────────────
  include ProfileMixin(profiles);
  include MoodMixin(moodLogs);
  include HabitMixin(habits, habitCompletions);
  include CycleMixin(cycleLogs, symptomsLogs);
  include JournalMixin(journals);
  include GoalMixin(goals);
  include SleepMixin(sleepLogs);
  include WaterMixin(waterLogs, waterGoals);
  include QuizMixin(quizResults);
  include SafetyMixin(safetyPlans);
  include AffirmationMixin();
};
