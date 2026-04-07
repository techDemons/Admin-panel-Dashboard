"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface AdminProfile {
  name: string;
  email: string;
  password: string;
  image: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  profile: AdminProfile;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<AdminProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultProfile: AdminProfile = {
  name: "Admin",
  email: "admin@adstacker.com",
  password: "admin123",
  image: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<AdminProfile>(defaultProfile);
  const router = useRouter();

  const login = useCallback(
    (email: string, password: string): boolean => {
      if (email && password.length >= 6) {
        setIsAuthenticated(true);
        setProfile((prev) => ({ ...prev, email }));
        router.push("/dashboard");
        return true;
      }
      return false;
    },
    [router]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    router.push("/login");
  }, [router]);

  const updateProfile = useCallback((updates: Partial<AdminProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, profile, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
