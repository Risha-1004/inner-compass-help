import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import Landing from "@/pages/Landing";
import Onboarding from "@/pages/Onboarding";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

// ─── Lazy pages ────────────────────────────────────────────────────────────────
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Mood = lazy(() => import("@/pages/Mood"));
const Habits = lazy(() => import("@/pages/Habits"));
const Journal = lazy(() => import("@/pages/Journal"));
const Goals = lazy(() => import("@/pages/Goals"));
const Sleep = lazy(() => import("@/pages/Sleep"));
const Water = lazy(() => import("@/pages/Water"));
const Cycle = lazy(() => import("@/pages/Cycle"));
const Breathing = lazy(() => import("@/pages/Breathing"));
const Wellness = lazy(() => import("@/pages/Wellness"));
const Quizzes = lazy(() => import("@/pages/Quizzes"));
const Safety = lazy(() => import("@/pages/Safety"));
const Insights = lazy(() => import("@/pages/Insights"));
const Resources = lazy(() => import("@/pages/Resources"));
const Contact = lazy(() => import("@/pages/Contact"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

// ─── Page loader ───────────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="space-y-4 p-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
    </div>
  );
}

function SuspensePage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

// ─── Guards ────────────────────────────────────────────────────────────────────
function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const { data: profile, isFetched } = useProfile();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isFetched && !profile) {
    return <Navigate to="/onboarding" />;
  }

  if (isFetched && profile && !profile.onboarding.completed) {
    return <Navigate to="/onboarding" />;
  }

  return <Layout />;
}

// ─── Root ─────────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Toaster richColors position="top-right" />
      <Outlet />
    </>
  ),
});

// ─── Public routes ────────────────────────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: Onboarding,
});

// ─── Protected layout ─────────────────────────────────────────────────────────
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: ProtectedLayout,
});

// ─── Protected pages ──────────────────────────────────────────────────────────
const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard",
  component: () => (
    <SuspensePage>
      <Dashboard />
    </SuspensePage>
  ),
});

const moodRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/mood",
  component: () => (
    <SuspensePage>
      <Mood />
    </SuspensePage>
  ),
});

const habitsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/habits",
  component: () => (
    <SuspensePage>
      <Habits />
    </SuspensePage>
  ),
});

const journalRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/journal",
  component: () => (
    <SuspensePage>
      <Journal />
    </SuspensePage>
  ),
});

const goalsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/goals",
  component: () => (
    <SuspensePage>
      <Goals />
    </SuspensePage>
  ),
});

const sleepRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/sleep",
  component: () => (
    <SuspensePage>
      <Sleep />
    </SuspensePage>
  ),
});

const waterRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/water",
  component: () => (
    <SuspensePage>
      <Water />
    </SuspensePage>
  ),
});

const cycleRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/cycle",
  component: () => (
    <SuspensePage>
      <Cycle />
    </SuspensePage>
  ),
});

const breathingRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/breathing",
  component: () => (
    <SuspensePage>
      <Breathing />
    </SuspensePage>
  ),
});

const wellnessRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/wellness",
  component: () => (
    <SuspensePage>
      <Wellness />
    </SuspensePage>
  ),
});

const quizzesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/quizzes",
  component: () => (
    <SuspensePage>
      <Quizzes />
    </SuspensePage>
  ),
});

const safetyRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/safety",
  component: () => (
    <SuspensePage>
      <Safety />
    </SuspensePage>
  ),
});

const insightsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/insights",
  component: () => (
    <SuspensePage>
      <Insights />
    </SuspensePage>
  ),
});

const resourcesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/resources",
  component: () => (
    <SuspensePage>
      <Resources />
    </SuspensePage>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/contact",
  component: () => (
    <SuspensePage>
      <Contact />
    </SuspensePage>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/settings",
  component: () => (
    <SuspensePage>
      <SettingsPage />
    </SuspensePage>
  ),
});

// ─── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  indexRoute,
  onboardingRoute,
  layoutRoute.addChildren([
    dashboardRoute,
    moodRoute,
    habitsRoute,
    journalRoute,
    goalsRoute,
    sleepRoute,
    waterRoute,
    cycleRoute,
    breathingRoute,
    wellnessRoute,
    quizzesRoute,
    safetyRoute,
    insightsRoute,
    resourcesRoute,
    contactRoute,
    settingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
