import { useAppStore } from "@/store/useAppStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const { login, clear, isLoginSuccess, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const setProfile = useAppStore((s) => s.setProfile);

  const isAuthenticated = !!identity;

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "";
      if (msg === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      } else {
        console.error("Login error:", error);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    setProfile(null);
    queryClient.clear();
  };

  return {
    isAuthenticated,
    isLoginSuccess,
    identity,
    login: handleLogin,
    logout: handleLogout,
  };
}
