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

const isValidRole = (value: string | null): value is Role => {
  return (
    value === "guest" ||
    value === "player" ||
    value === "owner" ||
    value === "admin"
  );
};

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  // مهم: نفس القيمة على Server و Client في أول render
  const [role, setRoleState] = useState<Role>("guest");

  // نقرأ localStorage بعد hydration
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (isValidRole(saved)) {
      setRoleState(saved);
    }
  }, []);

  // نحفظ أي تغيير
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, role);
  }, [role]);

  const setRole = useCallback((next: Role) => {
    setRoleState(next);
  }, []);

  const signOut = useCallback(() => {
    setRoleState("guest");
  }, []);

  const value = useMemo(
    () => ({ role, setRole, signOut }),
    [role, setRole, signOut],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = () => useContext(RoleContext);
