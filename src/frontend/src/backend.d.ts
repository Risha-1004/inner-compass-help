import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserPreferences {
    theme: Theme;
    highContrast: boolean;
    fontSize: FontSize;
}
export type Result_2 = {
    __kind__: "ok";
    ok: UserProfile;
} | {
    __kind__: "err";
    err: AppError;
};
export interface ProfessionalContact {
    name: string;
    role: string;
    phone: string;
}
export interface Habit {
    id: bigint;
    icon: string;
    name: string;
    createdAt: bigint;
    color: string;
    isArchived: boolean;
}
export type AppError = {
    __kind__: "alreadyExists";
    alreadyExists: null;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "unauthorized";
    unauthorized: null;
};
export type Result_5 = {
    __kind__: "ok";
    ok: CycleLog;
} | {
    __kind__: "err";
    err: AppError;
};
export type Result_1 = {
    __kind__: "ok";
    ok: SleepLog;
} | {
    __kind__: "err";
    err: AppError;
};
export interface MoodEntry {
    id: bigint;
    date: string;
    note?: string;
    createdAt: bigint;
    emoji: string;
    score: bigint;
}
export type Result_4 = {
    __kind__: "ok";
    ok: Goal;
} | {
    __kind__: "err";
    err: AppError;
};
export type Result_11 = {
    __kind__: "ok";
    ok: WaterIntakeEntry;
} | {
    __kind__: "err";
    err: AppError;
};
export interface HabitCompletion {
    date: string;
    completed: boolean;
    habitId: bigint;
}
export type Result_7 = {
    __kind__: "ok";
    ok: QuizResult;
} | {
    __kind__: "err";
    err: AppError;
};
export interface SupportContact {
    relation: string;
    name: string;
    phone: string;
}
export interface OnboardingData {
    hasPeriods?: boolean;
    completed: boolean;
}
export interface HabitStreak {
    habitId: bigint;
    longestStreak: bigint;
    currentStreak: bigint;
}
export type Result_6 = {
    __kind__: "ok";
    ok: HabitCompletion;
} | {
    __kind__: "err";
    err: AppError;
};
export interface SafetyPlan {
    warningSigns: Array<string>;
    userId: Principal;
    supportContacts: Array<SupportContact>;
    copingStrategies: Array<string>;
    updatedAt: bigint;
    professionalContacts: Array<ProfessionalContact>;
    safeEnvironmentNotes: string;
    reasonsToLive: Array<string>;
}
export interface QuizResult {
    id: bigint;
    date: string;
    answers: Array<string>;
    createdAt: bigint;
    score: bigint;
    quizId: string;
}
export type Result_12 = {
    __kind__: "ok";
    ok: SymptomsLog;
} | {
    __kind__: "err";
    err: AppError;
};
export type Result_9 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: AppError;
};
export interface DailyWaterLog {
    date: string;
    totalMl: bigint;
    goalMl: bigint;
    entries: Array<WaterIntakeEntry>;
}
export interface WaterIntakeEntry {
    id: bigint;
    date: string;
    amountMl: bigint;
    loggedAt: bigint;
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
export type Result = {
    __kind__: "ok";
    ok: SafetyPlan;
} | {
    __kind__: "err";
    err: AppError;
};
export interface SymptomsLog {
    id: bigint;
    date: string;
    createdAt: bigint;
    symptoms: Array<string>;
}
export type Result_3 = {
    __kind__: "ok";
    ok: JournalEntry;
} | {
    __kind__: "err";
    err: AppError;
};
export type Result_10 = {
    __kind__: "ok";
    ok: Habit;
} | {
    __kind__: "err";
    err: AppError;
};
export type Result_8 = {
    __kind__: "ok";
    ok: MoodEntry;
} | {
    __kind__: "err";
    err: AppError;
};
export interface JournalEntry {
    id: bigint;
    title: string;
    content: string;
    entryType: JournalType;
    date: string;
    createdAt: bigint;
    tags: Array<string>;
    updatedAt: bigint;
}
export interface CycleLog {
    id: bigint;
    endDate?: string;
    createdAt: bigint;
    flowIntensity: string;
    startDate: string;
}
export interface UserProfile {
    userId: Principal;
    createdAt: bigint;
    preferences: UserPreferences;
    onboarding: OnboardingData;
}
export interface Goal {
    id: bigint;
    status: GoalStatus;
    title: string;
    createdAt: bigint;
    description: string;
    updatedAt: bigint;
    progress: bigint;
    targetDate?: string;
}
export enum FontSize {
    lg = "lg",
    sm = "sm",
    base = "base"
}
export enum GoalStatus {
    active = "active",
    completed = "completed",
    abandoned = "abandoned"
}
export enum JournalType {
    gratitude = "gratitude",
    regular = "regular"
}
export enum Theme {
    ocean = "ocean",
    cloud = "cloud",
    night = "night",
    sunset = "sunset"
}
export interface backendInterface {
    addCycleLog(startDate: string, endDate: string | null, flowIntensity: string): Promise<Result_5>;
    addSymptomsLog(date: string, symptoms: Array<string>): Promise<Result_12>;
    addWaterIntake(date: string, amountMl: bigint): Promise<Result_11>;
    archiveHabit(habitId: bigint): Promise<Result_9>;
    completeOnboarding(hasPeriods: boolean): Promise<Result_2>;
    createGoal(title: string, description: string, targetDate: string | null): Promise<Result_4>;
    createHabit(name: string, color: string, icon: string): Promise<Result_10>;
    createJournalEntry(date: string, title: string, content: string, entryType: string, tags: Array<string>): Promise<Result_3>;
    deleteCycleLog(logId: bigint): Promise<Result_9>;
    deleteGoal(goalId: bigint): Promise<Result_9>;
    deleteHabit(habitId: bigint): Promise<Result_9>;
    deleteJournalEntry(entryId: bigint): Promise<Result_9>;
    deleteMoodEntry(entryId: bigint): Promise<Result_9>;
    deleteQuizResult(resultId: bigint): Promise<Result_9>;
    deleteSafetyPlan(): Promise<Result_9>;
    deleteSleepLog(logId: bigint): Promise<Result_9>;
    deleteSymptomsLog(logId: bigint): Promise<Result_9>;
    deleteWaterEntry(entryId: bigint): Promise<Result_9>;
    getCycleLogs(): Promise<Array<CycleLog>>;
    getDailyAffirmation(dayOfYear: bigint): Promise<string>;
    getDailyWaterLog(date: string): Promise<DailyWaterLog>;
    getGoals(status: string | null): Promise<Array<Goal>>;
    getHabitCompletions(fromDate: string, toDate: string): Promise<Array<HabitCompletion>>;
    getHabitStreak(habitId: bigint, today: string): Promise<HabitStreak>;
    getHabits(): Promise<Array<Habit>>;
    getJournalEntries(entryType: string | null): Promise<Array<JournalEntry>>;
    getJournalEntry(entryId: bigint): Promise<JournalEntry | null>;
    getMoodEntries(fromDate: string, toDate: string): Promise<Array<MoodEntry>>;
    getMyProfile(): Promise<UserProfile | null>;
    getQuizResults(quizId: string | null): Promise<Array<QuizResult>>;
    getSafetyPlan(): Promise<SafetyPlan | null>;
    getSleepLogs(fromDate: string, toDate: string): Promise<Array<SleepLog>>;
    getSymptomsLogs(): Promise<Array<SymptomsLog>>;
    logMood(date: string, emoji: string, score: bigint, note: string | null): Promise<Result_8>;
    logSleep(date: string, bedtime: string, wakeTime: string, quality: bigint, notes: string | null): Promise<Result_1>;
    saveQuizResult(quizId: string, date: string, score: bigint, answers: Array<string>): Promise<Result_7>;
    setHabitCompletion(habitId: bigint, date: string, completed: boolean): Promise<Result_6>;
    setWaterGoal(goalMl: bigint): Promise<void>;
    updateCycleLog(logId: bigint, endDate: string | null, flowIntensity: string | null): Promise<Result_5>;
    updateGoal(goalId: bigint, title: string | null, description: string | null, targetDate: string | null, status: string | null, progress: bigint | null): Promise<Result_4>;
    updateJournalEntry(entryId: bigint, title: string | null, content: string | null, tags: Array<string> | null): Promise<Result_3>;
    updatePreferences(theme: string, fontSize: string, highContrast: boolean): Promise<Result_2>;
    updateSleepLog(logId: bigint, bedtime: string | null, wakeTime: string | null, quality: bigint | null, notes: string | null): Promise<Result_1>;
    upsertSafetyPlan(reasonsToLive: Array<string>, warningSigns: Array<string>, copingStrategies: Array<string>, supportContacts: Array<SupportContact>, professionalContacts: Array<ProfessionalContact>, safeEnvironmentNotes: string): Promise<Result>;
}
