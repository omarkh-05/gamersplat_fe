"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Role = "guest" | "player" | "owner" | "admin";

type RoleContextValue = {
  role: Role;
  setRole: (role: Role) => void;
  signOut: () => void;
};

const RoleContext = createContext<RoleContextValue>({
  role: "guest",
  setRole: () => {},
  signOut: () => {},
});

const STORAGE_KEY = "gamersplat.role";

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRoleState] = useState<Role>("guest");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as Role | null;
    setRoleState(saved ?? "guest");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, role);
  }, [role, hydrated]);

  const setRole = useCallback((next: Role) => setRoleState(next), []);
  const signOut = useCallback(() => setRoleState("guest"), []);

  const value = useMemo(
    () => ({ role, setRole, signOut }),
    [role, setRole, signOut],
  );
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = () => useContext(RoleContext);
