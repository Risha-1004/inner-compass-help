import type { Principal } from "@icp-sdk/core/principal";

export type Theme = "cloud" | "ocean" | "sunset" | "night";
export type FontSize = "sm" | "base" | "lg";

export interface UserPreferences {
  theme: Theme;
  highContrast: boolean;
  fontSize: FontSize;
}

export interface OnboardingData {
  hasPeriods?: boolean;
  completed: boolean;
}

export interface UserProfile {
  userId: Principal;
  createdAt: bigint;
  preferences: UserPreferences;
  onboarding: OnboardingData;
}

export interface MoodEntry {
  id: bigint;
  date: string;
  note?: string;
  createdAt: bigint;
  emoji: string;
  score: bigint;
}

export interface Habit {
  id: bigint;
  icon: string;
  name: string;
  createdAt: bigint;
  color: string;
  isArchived: boolean;
}

export interface HabitCompletion {
  date: string;
  completed: boolean;
  habitId: bigint;
}

export interface HabitStreak {
  habitId: bigint;
  longestStreak: bigint;
  currentStreak: bigint;
}

export interface JournalEntry {
  id: bigint;
  title: string;
  content: string;
  entryType: "regular" | "gratitude";
  date: string;
  createdAt: bigint;
  tags: string[];
  updatedAt: bigint;
}

export interface Goal {
  id: bigint;
  status: "active" | "completed" | "abandoned";
  title: string;
  createdAt: bigint;
  description: string;
  updatedAt: bigint;
  progress: bigint;
  targetDate?: string;
}

export interface SleepLog {
  id: bigint;
  bedtime: string;
  date: string;
  quality: bigint;
  createdAt: bigint;
  wakeTime: string;
  notes?: string;
}

export interface WaterIntakeEntry {
  id: bigint;
  date: string;
  amountMl: bigint;
  loggedAt: bigint;
}

export interface DailyWaterLog {
  date: string;
  totalMl: bigint;
  goalMl: bigint;
  entries: WaterIntakeEntry[];
}

export interface CycleLog {
  id: bigint;
  endDate?: string;
  createdAt: bigint;
  flowIntensity: string;
  startDate: string;
}

export interface SymptomsLog {
  id: bigint;
  date: string;
  createdAt: bigint;
  symptoms: string[];
}

export interface QuizResult {
  id: bigint;
  date: string;
  answers: string[];
  createdAt: bigint;
  score: bigint;
  quizId: string;
}

export interface SupportContact {
  relation: string;
  name: string;
  phone: string;
}

export interface ProfessionalContact {
  name: string;
  role: string;
  phone: string;
}

export interface SafetyPlan {
  warningSigns: string[];
  userId: Principal;
  supportContacts: SupportContact[];
  copingStrategies: string[];
  updatedAt: bigint;
  professionalContacts: ProfessionalContact[];
  safeEnvironmentNotes: string;
  reasonsToLive: string[];
}

export type AppError =
  | { __kind__: "alreadyExists"; alreadyExists: null }
  | { __kind__: "invalidInput"; invalidInput: string }
  | { __kind__: "notFound"; notFound: null }
  | { __kind__: "unauthorized"; unauthorized: null };
