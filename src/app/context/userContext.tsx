"use client";

import { userDataTypeForSidebar } from "@/interfaces/summary";
import { getUserData } from "@/lib/serverUtils";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { logout } from "@/app/actions/auth";

type UserContextType = {
  userData: userDataTypeForSidebar | null;
  loginUser: () => void;
  logoutUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<userDataTypeForSidebar | null>(null);

  useEffect(() => {
    handleUserDataChange();
  }, []);

  const handleUserDataChange = async () => {
    setUserData(await getUserData());
  };

  const loginUser = async () => {
    await handleUserDataChange();
  };

  const logoutUser = async () => {
    await logout();
    await handleUserDataChange();
  };

  return (
    <UserContext.Provider value={{ userData, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
