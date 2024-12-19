'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type UserContextType = {
  userId: string | undefined;
  loginUser: (userData: string | undefined) => void;
  logoutUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserId(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData: string | undefined) => {
    setUserId(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUserId(undefined);
    localStorage.removeItem('user');
  };
  return (
    <UserContext.Provider value={{ userId, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
