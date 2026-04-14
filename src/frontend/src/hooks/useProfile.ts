import { createActor } from "@/backend";
import { useAppStore } from "@/store/useAppStore";
import type { FontSize, Theme, UserProfile } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

export function useProfile() {
  const { actor, isFetching: actorFetching } = useBackendActor();
  const setProfile = useAppStore((s) => s.setProfile);
  const setTheme = useAppStore((s) => s.setTheme);
  const setFontSize = useAppStore((s) => s.setFontSize);
  const setHighContrast = useAppStore((s) => s.setHighContrast);

  const query = useQuery<UserProfile | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const profile = await actor.getMyProfile();
      if (profile) {
        setProfile(profile);
        setTheme(profile.preferences.theme as Theme);
        setFontSize(profile.preferences.fontSize as FontSize);
        setHighContrast(profile.preferences.highContrast);
      }
      return profile;
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useCompleteOnboarding() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (hasPeriods: boolean) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.completeOnboarding(hasPeriods);
      if (result.__kind__ === "err") throw new Error("Onboarding failed");
      return result.ok;
    },
    onSuccess: (profile) => {
      queryClient.setQueryData(["myProfile"], profile);
    },
  });
}

export function useUpdatePreferences() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      theme,
      fontSize,
      highContrast,
    }: {
      theme: string;
      fontSize: string;
      highContrast: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.updatePreferences(
        theme,
        fontSize,
        highContrast,
      );
      if (result.__kind__ === "err") throw new Error("Update failed");
      return result.ok;
    },
    onSuccess: (profile) => {
      queryClient.setQueryData(["myProfile"], profile);
    },
  });
}

export function useDailyAffirmation() {
  const { actor, isFetching: actorFetching } = useBackendActor();

  const dayOfYear = BigInt(
    Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        86400000,
    ),
  );

  return useQuery<string>({
    queryKey: ["affirmation", dayOfYear.toString()],
    queryFn: async () => {
      if (!actor) return "You are worthy of care and kindness.";
      return actor.getDailyAffirmation(dayOfYear);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
